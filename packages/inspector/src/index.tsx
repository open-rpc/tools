import ReactDOM from "react-dom";
import React from "react";
import App from "./containers/App";
import "./App.css";
import "./splitpane.css";

import {default as Inspector} from "./containers/Inspector";
export default Inspector;

if (typeof document !== 'undefined') {
  ReactDOM.render(<App />, document.getElementById("root"));
}
