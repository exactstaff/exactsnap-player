import React from 'react';
import classes from './Slide.css';


const slide = (props) => {
    return(
        <div className={classes.Slide}>
            <div className={classes.title}>
                <h2>
                    Wooland Hills
                </h2>
            </div>
            <div className={classes.image}>
                <img src="https://placeimg.com/700/420/nature" alt="Placeholder"/>
            </div>
            <div className={classes.description}>
                <p>
                Bacon ipsum dolor amet in ut lorem capicola fugiat tail. Esse kielbasa cillum laboris ham elit. Sausage pork belly ea irure, tenderloin ut bresaola. Proident short ribs pork chop laborum ea pariatur boudin swine, bresaola porchetta corned beef et. Lorem boudin est t-bone sunt ham aliquip, aute labore tempor.
                </p>
            </div>
        </div>
    );
};

export default slide;