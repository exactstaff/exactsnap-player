import React from 'react';
import classes from './Bubble.css';

const bubble = (props) => {
    let cssClasses = classes.Bubble +' '+props.extraClasses;
    return (
        <div className={cssClasses}>
            {props.children}
        </div>
    );
}

export default bubble;