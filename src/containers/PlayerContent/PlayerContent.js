import React,{Component} from 'react';
import classes from './PlayerContent.css';
import SlideShowContainer from '../SlideShowContainer/SlideShowContainer';
import Sidebar from '../Sidebar/Sidebar';


class playerContent extends Component{

    render() {
        return(
            <div className={classes.playerContent}>
                <Sidebar />
                <SlideShowContainer/>
            </div>
        );
    }

}

export default playerContent;