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
    weatherFetch()
      .then((response) => {
        let humidity = response.humidity;
        let apparentTemperature = response.apparentTemperature;
        let windGust = response.windGust;
        let summary = response.summary;
        let icon = response.icon;

        let currentWeather = {
          apparentTemperature: Math.round(apparentTemperature * 10) / 10,
          humidity: Math.round(humidity * 100),
          windGust: Math.round(windGust * 2.237 * 10) / 10,
          summary: summary,
          icon: icon,
        };

        let myLocation = {
          latitude: response.latitude,
          longitude: response.longitude,
          city: response.city,
          region: response.region,
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
