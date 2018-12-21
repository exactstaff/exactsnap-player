import React,{Component} from 'react';
import classes from './Weather.css';
import axios from 'axios';
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
        axios.get('http://api.ipstack.com/45.26.254.145?access_key=8773b56636e9c17e2e130a4329d4bf9c', {'crossDomain': true})
        .then((location) => {
            console.log(location);
            let latitude = location.data.latitude;
            let longitude = location.data.longitude;
            let city = location.data.city;
            let region = location.data.region_code;

            let myLocation = {
                latitude: latitude,
                longitude: longitude,
                city: city,
                region: region
            };

        axios.get('https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/99b286b413bdfce89250f662f1ee6441/'+myLocation.latitude+','+myLocation.longitude+'', { 'crossDomain': true})
            .then((response) => {
            console.log(response);
            let humidity = response.data.currently.humidity;
            let apparentTemperature = response.data.currently.apparentTemperature;
            let windGust = response.data.currently.windGust;
            let summary = response.data.currently.summary;
            let icon = response.data.currently.icon;

            let currentWeather = {
                apparentTemperature: Math.round(apparentTemperature * 10 ) / 10,
                humidity: Math.round(humidity * 100),
                windGust: Math.round((windGust * 2.237) * 10 ) / 10,
                summary: summary,
                icon: icon
            };

            this.setState(
                {weather: currentWeather}
                );
            })
            .catch(function (error) {
            console.log(error);
            });

        this.setState(
            {location: myLocation}
        );

        // setInterval(function(){
        //     window.location.reload(1);
        //  }, 10000);
    });
    }

    componentDidMount(){
       this.getWeather();
       setInterval(()=>{
            this.getWeather();
            console.log("Weather refreshed");
        }, 10000);
    }

    render() {
        return(
        <div className={classes.Weather}>

            <div className={[classes.container, backgroundChanger(this.state.weather.icon)].join(' ')} >

                <div className={classes.column_three}>
                    <h3>{this.state.location.city}, {this.state.location.region}</h3>
                </div>
                
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