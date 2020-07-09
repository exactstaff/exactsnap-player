// import Skycons from 'react-skycons';
// import classes from './Weather.css';
import clearDay from './icons/CLEAR_DAY.svg';
import clearNight from './icons/CLEAR_NIGHT.svg';
import rain from './icons/RAIN.svg';
import snow from './icons/SNOW.svg';
import sleet from './icons/SLEET.svg';
import wind from './icons/CLEAR_CLOUDY.svg';
import fog from './icons/CLEAR_CLOUDY.svg';
import clearCloudy from './icons/CLEAR_CLOUDY.svg';
import partlyCloudyDay from './icons/PARTLY_CLOUDY_DAY.svg';
import partlyCloudyNight from './icons/PARTLY_CLOUDY_NIGHT.svg';
// import thunder from './icons/thunder.svg';
import thermo from './icons/thermo.svg';


function iconChanger (icon) {
    switch(icon) {

        case 'clear-day':
            return clearDay;
        case 'clear-night':
           return clearNight;
        case 'rain':
            return  rain;
        case 'snow':
            return snow;
        case 'clear-sleet':
            return sleet;
        case 'clear-wind':
            return wind;
        case 'clear-fog':
            return fog;
        case 'clear-cloudy':
            return clearCloudy;
        case 'partly-cloudy-day':
            return partlyCloudyDay;
        case 'partly-cloudy-night':
            return partlyCloudyNight;
        case 'overcast':
            return wind;
        default:
            return thermo;

    }
}

export default iconChanger;