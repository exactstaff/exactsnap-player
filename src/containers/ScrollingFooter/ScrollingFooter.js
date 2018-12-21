import React,{Component} from 'react';
import classes from './ScrollingFooter.css';

class ScrollingFooter extends Component {
    render() {
        return(
        <div className={classes.ScrollingFooter}>
        <div className={classes.ticker}>
            <div className={classes.tickerItem}>Letterpress chambray brunch.</div>
            <div className={classes.tickerItem}>Vice mlkshk crucifix beard chillwave meditation hoodie asymmetrical Helvetica.</div>
            <div className={classes.tickerItem}>Ugh PBR&B kale chips Echo Park.</div>
            <div className={classes.tickerItem}>Gluten-free mumblecore chambray mixtape food truck. </div>

            <div className={classes.tickerItem}>Letterpress chambray brunch.</div>
            <div className={classes.tickerItem}>Vice mlkshk crucifix beard chillwave meditation hoodie asymmetrical Helvetica.</div>
            <div className={classes.tickerItem}>Ugh PBR&B kale chips Echo Park.</div>
            <div className={classes.tickerItem}>Gluten-free mumblecore chambray mixtape food truck. </div>
            <div className={classes.tickerItem}>Authentic bitters seitan pug single-origin coffee whatever.</div>
            </div>
        </div>);
    }
}

export default ScrollingFooter;