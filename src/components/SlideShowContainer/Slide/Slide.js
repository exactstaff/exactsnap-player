import React, { Component } from "react";
import classes from "./Slide.css";
// import * as Vibrant from 'node-vibrant';
//const electron = window.require('electron');
// const fs = electron.remote.require('fs');
//const Path = electron.remote.require('path');

class Slide extends Component {
  state = {
    isVisible: false,
    slideDuration: 0,
    status: classes.active,
  };

  render() {
    // console.log("rendered");
    // // Using constructor
    // let v = new Vibrant(this.props.image)
    // v.getPalette((err, palette) => console.log(palette))
    // // Promise
    // v.getPalette().then((palette) => console.log(palette))

    //read image (note: use async in production)

    // let _img = fs.readFileSync('data/images/'+this.props.image).toString('base64');
    //  let _out = "data:image/jpeg;base64, " + _img;
    //  let _out = Path.resolve('data/images', this.props.image);

    //  console.log(_out);

    //  _out = "https://www.exactstaff.com/_ui/images/logo_exactstaff.png";
    //render/display

    return (
      <div
        className={[classes.Slide, this.state.status].join(" ")}
        style={{
          backgroundColor:
            "rgba(" + this.props.backgroundColors[0].join(",") + ")",
        }}
      >
        <div className={classes.title}>
          <h2>{this.props.location}</h2>
        </div>
        <div className={classes.image}>
          <img
            // src={"data:image/png;base64, " + this.props.image}
            src={this.props.image}
            alt={classes.description}
          />
        </div>
        <div className={classes.description}>
          <p>{this.props.description}</p>
        </div>
      </div>
    );
  }
}

export default Slide;
