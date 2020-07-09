import React, { Component } from "react";
import Bubble from "../UI/Bubble/Bubble";
import classes from "./Sidebar.css";
import Weather from "../Widgets/Weather/Weather";
import Jobs from "../Widgets/Jobs/Jobs";

class Sidebar extends Component {
  render() {
    return (
      <Bubble extraClasses={classes.Sidebar}>
        <div className={classes.logo}>
          <img
            src="https://www.exactstaff.com/_ui/images/logo_exactstaff.png"
            alt="Exact Staff logo"
          />
        </div>

        <Weather />
        <Jobs />
      </Bubble>
    );
  }
}

export default Sidebar;
