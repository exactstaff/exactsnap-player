import React,{Component} from 'react';
import classes from './Weather.css';
import axios from 'axios';
import Clock from 'react-live-clock';
import { WiDaySunny } from 'weather-icons-react';

class Weather extends Component {
      
  state = {
    weather: {
      apparentTemperature: "loading",
      humidity: "loading",
      windGust: "loading",
      icon: "loading"
    },

    location: {
        latitude: "loading",
        longitude: "loading",
        city: "loading",
        region: "loading"
    }
  }

  componentDidMount(){
    axios.get('https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/99b286b413bdfce89250f662f1ee6441/34.16831,-118.59729', { 'crossDomain': true})
    .then((response) => {
      console.log(response);
      let humidity = response.data.currently.humidity;
      let apparentTemperature = response.data.currently.apparentTemperature;
      let windGust = response.data.currently.windGust;
      let icon = response.data.currently.icon;

      let currentWeather = {
        apparentTemperature: apparentTemperature,
        humidity: Math.round(humidity * 100),
        windGust: windGust,
        icon: icon
    };
      this.setState(
        {weather: currentWeather}
        );
    })
    .catch(function (error) {
      console.log(error);
    });

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

        this.setState(
            {location: myLocation}
        );
    }
    )
  }

    render() {
        return(
        <div className={classes.Weather}>
            <div className={classes.container}>
                <div className={classes.header}>
                    <h3>{this.state.location.city}, {this.state.location.region}</h3>
                    <p>{this.state.weather.icon}</p>
                    <h1><WiDaySunny size={80} color='#FFF' /></h1>
                    <h2><Clock format={'HH:mm:ss'} ticking={true} timezone={'US/Pacific'} /> AM</h2>
                </div>
                <div className={classes.weather}>
                    <h1 className="temp">{this.state.weather.apparentTemperature} &#8457;</h1>
                    <p>Humidity: {this.state.weather.humidity} %</p>
                    <p>Wind: {this.state.weather.windGust} mph</p>
                </div>
            </div>
        </div>
        );
    }
}

export default Weather;