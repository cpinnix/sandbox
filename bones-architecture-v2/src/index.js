import React from "react";
import ReactDOM from "react-dom";

import ConnectedArena from "./components/ConnectedArena";
import ConnectedCounter from "./components/ConnectedCounter";

import buildArena from "./apps/arena/build";
ReactDOM.render(
  <React.StrictMode>
    <ConnectedCounter />
    <ConnectedArena />
  </React.StrictMode>,
  document.getElementById("counter")
);

buildArena({ container: document.getElementById("arena") });
