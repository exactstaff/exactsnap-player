import React,{Component} from 'react';
import Bubble from '../../components/UI/Bubble/Bubble';
import classes from './Sidebar.css';
import Weather from './Widgets/Weather/Weather';

class Sidebar extends Component {
    render () {
        return(
            <Bubble extraClasses = {classes.Sidebar}>
                <div className={classes.logo}>
                    <img  src="https://www.exactstaff.com/_ui/images/logo_exactstaff.png" alt="Exact Staff logo"/>
                </div>
                <Weather/>
            </Bubble>
        );
    }
}

export default Sidebar;