import React, { useState } from "react";

const PlayerContext = React.createContext([{}, () => {}]);

const PlayerProvider = (props) => {
  const [state, setState] = useState({ paused: false });

  return (
    <PlayerContext.Provider value={[state, setState]}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export { PlayerContext, PlayerProvider };
