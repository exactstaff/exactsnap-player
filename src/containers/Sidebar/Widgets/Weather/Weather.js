import React,{Component} from 'react';
import classes from './Weather.css';

class Weather extends Component {
    render() {
        return(
        <div className={classes.Weather}>
            {/* <iframe tittle="weather widget" id="forecast_embed" frameBorder="0" height="245" width="100%" src="//forecast.io/embed/#lat=34.1672543&color=#00aaff&lon=-118.5939473&name=Woodland Hills"></iframe> */}
            <a className="weatherwidget-io" href="https://forecast7.com/en/34d05n118d24/los-angeles/?unit=us" data-label_1="LOS ANGELES" data-label_2="WEATHER" data-icons="Climacons Animated" data-theme="weather_one" >LOS ANGELES WEATHER</a>
        </div>
        );
    }
}

export default Weather;