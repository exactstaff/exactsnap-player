import React,{Component} from 'react';
import classes from './PlayerContent.css';
import SlideShow from '../SlideShow/SlideShow';
import Sidebar from '../Sidebar/Sidebar';

class playerContent extends Component{

    render() {
        return(
            <div className={classes.playerContent}>
                <Sidebar />
                <SlideShow/>
            </div>
        );
    }

}

export default playerContent;