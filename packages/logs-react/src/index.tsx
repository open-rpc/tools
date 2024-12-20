import ReactDOM from "react-dom";
import React from "react";
import MyApp from "./containers/MyApp";
import JSONRPCLogger from "./components/logsReact/logsReact";

// NOTE: This isn't what we want to do here, but it allows us to cross package build 
//TODO: ReactDOM.render(<MyApp />, document.getElementById("root"));

import type { IJSONRPCLog } from "./components/logsReact/logsReact";

export type { IJSONRPCLog as JSONRPCLog };
export { JSONRPCLogger };
export default JSONRPCLogger;

// Keep the app rendering for development
if (typeof document !== 'undefined') {
  const MyApp = require('./containers/MyApp').default;
  const ReactDOM = require('react-dom');
  ReactDOM.render(<MyApp />, document.getElementById("root"));
}