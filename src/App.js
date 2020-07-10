import React, { Component } from "react";
import Player from "./components/Player/Player";
import "./App.css";
import { PlayerProvider } from "./context/PlayerContext";

class App extends Component {
  render() {
    return (
      <PlayerProvider>
        <Player />
      </PlayerProvider>
    );
  }
}

export default App;
