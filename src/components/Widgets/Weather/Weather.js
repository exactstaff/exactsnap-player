import React, { Component } from "react";
import classes from "./Weather.css";
import axios from "../../../sources/axios-posts";
// import Clock from 'react-live-clock';
import backgroundChanger from "./widget-background";
// import Skycons from 'react-skycons';
import iconChanger from "./icon-changer";
const publicIp = require("public-ip");

let ip = (async () => {
  return publicIp.v4();
})();

class Weather extends Component {
  state = {
    weather: {
      apparentTemperature: "loading",
      humidity: "loading",
      windGust: "loading",
      summary: "loading",
    },

    location: {
      latitude: "loading",
      longitude: "loading",
      city: "loading",
      region: "loading",
    },
  };

  getWeather() {
    //get longitude, lattitude
    axios
      .get(
        `http://api.ipstack.com/45.26.254.145?access_key=8773b56636e9c17e2e130a4329d4bf9c`,
        { crossDomain: true }
      )
      .then((coordinates) => {
        console.log(coordinates.data);
      });

    //get weather
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=34.3046&lon=-118.6844&appid=bc2086fc0d833ceef9245eeb53fa23cc&units=Imperial`,
        { crossDomain: true }
      )
      .then((response) => {
        let humidity = response.data.main.humidity;
        let apparentTemperature = response.data.main.temp;
        let windGust = response.data.wind.speed;
        let summary = response.data.weather[0].main;
        let icon = response.data.weather[0].icon;

        let currentWeather = {
          apparentTemperature: Math.round(apparentTemperature * 10) / 10,
          humidity: Math.round(humidity * 1),
          windGust: windGust,
          summary: summary,
          icon: icon,
        };

        let myLocation = {
          latitude: response.data.latitude,
          longitude: response.data.longitude,
          city: response.data.city,
          region: response.data.region,
        };

        this.setState({ weather: currentWeather, location: myLocation });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  componentDidMount() {
    this.getWeather();
    setInterval(() => {
      this.getWeather();
      console.log("Weather refreshed");
    }, 10800000);
  }

  render() {
    return (
      <div className={classes.Weather}>
        <div
          className={[
            classes.container,
            backgroundChanger(this.state.weather.icon),
          ].join(" ")}
        >
          <img
            className={classes.icon}
            src={iconChanger(this.state.weather.icon)}
            alt="icons"
          />

          <div className={classes.column_one}>
            <p className={classes.temp}>
              {this.state.weather.apparentTemperature} F
            </p>
          </div>

          <div className={classes.column_two}>
            <h3>{this.state.weather.summary}</h3>
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
