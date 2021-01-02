import React from "react";
import ReactDOM from "react-dom";
import { links } from "./data";

import Header from "./App";

ReactDOM.render(
  <React.StrictMode>
    <Header links={links} />
  </React.StrictMode>,
  document.getElementById("root")
);
