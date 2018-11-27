import React,{Component} from 'react';
import classes from './SlideShow.css';
import Slide from '../../components/Slideshow/Slide/Slide';


class SlideShow extends Component {

    render() {
        return(
            <div className={classes.SlideShow}>
                <Slide />
            </div>
        );
    }
};

export default SlideShow;