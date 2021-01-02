import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import paths from "./data/paths";
import defaultPreferences from "./data/preferences";
import Root from "./components/Root";

ReactDOM.render(
  <React.StrictMode>
    <Root paths={paths} defaultPreferences={defaultPreferences} />
  </React.StrictMode>,
  document.getElementById("root")
);
