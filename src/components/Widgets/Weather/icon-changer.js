// import Skycons from 'react-skycons';
// import classes from './Weather.css';
import clearDay from "./icons/CLEAR_DAY.svg";
import clearNight from "./icons/CLEAR_NIGHT.svg";
import rain from "./icons/RAIN.svg";
import snow from "./icons/SNOW.svg";
import sleet from "./icons/SLEET.svg";
import wind from "./icons/CLEAR_CLOUDY.svg";
import fog from "./icons/CLEAR_CLOUDY.svg";
import clearCloudy from "./icons/CLEAR_CLOUDY.svg";
import partlyCloudyDay from "./icons/PARTLY_CLOUDY_DAY.svg";
import partlyCloudyNight from "./icons/PARTLY_CLOUDY_NIGHT.svg";
// import thunder from './icons/thunder.svg';
import thermo from "./icons/thermo.svg";

function iconChanger(icon) {
  switch (icon) {
    case "01d":
      return clearDay;
    case "01n":
      return clearNight;
    case "10d":
      return rain;
    case "13d":
      return snow;
    case "13d":
      return sleet;
    case "50d":
      return wind;
    case "03n":
      return fog;
    case "03d":
      return clearCloudy;
    case "02d":
      return partlyCloudyDay;
    case "02n":
      return partlyCloudyNight;
    case "50n":
      return wind;
    default:
      return thermo;
  }
}

export default iconChanger;
