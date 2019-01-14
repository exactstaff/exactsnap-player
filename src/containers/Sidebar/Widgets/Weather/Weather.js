import React,{Component} from 'react';
import classes from './Weather.css';
import axios from '../../../../sources/axios-posts';
// import Clock from 'react-live-clock';
import backgroundChanger from './widget-background';
// import Skycons from 'react-skycons';
import iconChanger from './icon-changer';




class Weather extends Component {

        state = {
        weather: {
        apparentTemperature: "loading",
        humidity: "loading",
        windGust: "loading",
        summary: "loading"
        },

        location: {
        latitude: "loading",
        longitude: "loading",
        city: "loading",
        region: "loading"
        }
    }

    getWeather() {

        axios.get('weather', { 'crossDomain': true})
        .then((response) => {
            console.log(response);
            let humidity = response.data.humidity;
            let apparentTemperature = response.data.apparentTemperature;
            let windGust = response.data.windGust;
            let summary = response.data.summary;
            let icon = response.data.icon;

            let currentWeather = {
                apparentTemperature: Math.round(apparentTemperature * 10 ) / 10,
                humidity: Math.round(humidity * 100),
                windGust: Math.round((windGust * 2.237) * 10 ) / 10,
                summary: summary,
                icon: icon
            };

            let myLocation = {
                latitude: response.data.latitude,
                longitude: response.data.longitude,
                city: response.data.city,
                region: response.data.region
            };

            this.setState(
                {weather: currentWeather,location: myLocation}
                );
            })
        .catch(function (error) {
            console.log(error);
        });

    }

    componentDidMount(){
       this.getWeather();
       setInterval(()=>{
            this.getWeather();
            console.log("Weather refreshed");
        }, 10800000);
    }

    render() {
        return(
        <div className={classes.Weather}>

            <div className={[classes.container, backgroundChanger(this.state.weather.icon)].join(' ')} >

                <div className={classes.column_four}>
                    <h3>{this.state.weather.summary}</h3>
                </div>

                <img className={classes.icon} src={iconChanger(this.state.weather.icon)}  alt="icons" />


                <div className={classes.column_one}>
                    <p className={classes.temp}>{this.state.weather.apparentTemperature} F</p>
                </div>

                <div className={classes.column_two}>
                    <p>Humidity: {this.state.weather.humidity}%</p>
                    <p>Wind: {this.state.weather.windGust} mph</p>
                </div>
            </div>
        </div>
        );
    }
}

export default Weather;

// SET HUMIDITY TO MPH CURRENTLY IN KHM
//<h3><Clock format={'h:mm a'} timezone={'US/Pacific'}/></h3>  //Commented out the import for the clock