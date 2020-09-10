const axios = require("axios");
const Path = require("path");
const fs = require("fs");

async function get() {
  let ip = "45.26.254.145";
  let currentLocation = {
    latitude: 0,
    longitude: 0,
    city: "N/A",
    region: "N/A",
    humidity: 0,
    apparentTemperature: 0,
    windGust: 0,
    summary: "N/A",
    icon: "N/A",
  };

  try {
    let ip = await axios.get("https://api.ipify.org?format=json").data.ip;

    let location = await axios.get(
      "http://api.ipstack.com/" +
        ip +
        "?access_key=8773b56636e9c17e2e130a4329d4bf9c",
      { crossDomain: true }
    );

    currentLocation.latitude = location.data.latitude;
    currentLocation.longitude = location.data.longitude;
    currentLocation.city = location.data.city;
    currentLocation.region = location.data.region_code;

    // let response = await axios.get(
    //   "https://api.darksky.net/forecast/a8de0abe53bc4c62e5826978c6bf640f/" +
    //     currentLocation.latitude +
    //     "," +
    //     currentLocation.longitude
    // );

    let response = await axios.get(
      `https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=${
        currentLocation.latitude
      }&lon=${
        currentLocation.longitude
      }&appid=bc2086fc0d833ceef9245eeb53fa23cc`,
      { crossDomain: true }
    );

    currentLocation.humidity = response.data.main.humidity;
    currentLocation.apparentTemperature =
      response.data.currently.apparentTemperature;
    currentLocation.windGust = response.data.currently.windGust;
    currentLocation.summary = response.data.currently.summary;
    currentLocation.icon = response.data.currently.icon;
    return currentLocation;
  } catch (ex) {
    console.log(ex);
    currentLocation.error = ex.message;
    return currentLocation;
  }
}

module.exports.get = get;
