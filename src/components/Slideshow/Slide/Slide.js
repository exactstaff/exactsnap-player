import React from 'react';
import classes from './Slide.css';


const slide = (props) => {
    return(
        <div className={classes.Slide}>
            <div className={classes.title}>
                <h2>
                    {props.location}
                </h2>
            </div>
            <div className={classes.image}>
                <img src={props.image} alt="Placeholder"/>
            </div>
            <div className={classes.description}>
                <p>
                {props.description}
                </p>
            </div>
        </div>
    );
};

export default slide;