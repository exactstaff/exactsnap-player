import React,{Component} from 'react';
import classes from './Weather.css';

class Weather extends Component {
    
    
    render() {
        return(
        <div className={classes.Weather}>
            {/* <iframe tittle="weather widget" id="forecast_embed" frameBorder="0" height="245" width="100%" src="//forecast.io/embed/#lat=34.1672543&color=#00aaff&lon=-118.5939473&name=Woodland Hills"></iframe> */}
            <div className="container">
                <div className="header">
                    <h3>Los Angeles, CA</h3>
                    {/* <h1><WiDaySunny size={80} color='#000' /></h1> */}
                    {/* <h2><Clock format={'HH:mm'} ticking={true} timezone={'US/Pacific'} /> AM</h2> */}
                </div>
                <div className="weather">
                    {/* <h1 className="temp">{this.state.weather.apparentTemperature} &#8457;</h1> */}
                    <p>Humidity: {this.state.weather.humidity} %</p>
                    <p>Wind: {this.state.weather.windGust} mph</p>
                </div>
            </div>
        </div>
        );
    }
}

export default Weather;