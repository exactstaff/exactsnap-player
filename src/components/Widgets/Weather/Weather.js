import React, { Component } from "react";
import classes from "./Weather.css";

// import Clock from 'react-live-clock';
import backgroundChanger from "./widget-background";
// import Skycons from 'react-skycons';
import iconChanger from "./icon-changer";
import weatherFetch from "../../../lib/weather";

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
    axios //GETS LOCATION DATA
      .get(`https://geolocation-db.com/json/`, { crossDomain: true })
      .then((res) => {
        axios //GETS WEATHER DATA
          .get(
            `https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=${
              res.data.latitude
            }&lon=${
              res.data.longitude
            }&appid=bc2086fc0d833ceef9245eeb53fa23cc&units=Imperial`,
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
              latitude: res.data.latitude,
              longitude: res.data.longitude,
              city: res.data.city,
              region: res.data.state,
            };

            this.setState({ weather: currentWeather, location: myLocation });
          })
          .catch(function(error) {
            console.log(error);
          });
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
