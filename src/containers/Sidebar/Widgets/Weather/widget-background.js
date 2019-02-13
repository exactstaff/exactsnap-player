import classes from './Weather.css';


function backgroundChanger (icon) {
    switch(icon) {
        case 'clear-day':
            return ( classes.clearDay );
            
        case 'clear-night':
            return ( classes.clearNight );
        
        case 'rain':
            return ( classes.rain );
        
        case 'snow':
            return ( classes.snow );
        
        case 'clear-sleet':
            return ( classes.sleet );
        
        case 'clear-wind':
            return ( classes.wind );
        
        case 'clear-fog':
            return ( classes.fog );
        
        case 'clear-cloudy':
            return ( classes.cloudy );
        
        case 'partly-cloudy-day':
            return ( classes.partlyCloudyDay );
        
        case 'partly-cloudy-night':
            return ( classes.partlyCloudyNight );
        case 'overcast':
            return ( classes.rain );
        default:
            return ( classes.clearDay );
    }
}

export default backgroundChanger;