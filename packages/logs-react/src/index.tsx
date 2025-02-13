import ReactDOM from "react-dom/client";
import React from "react";
import MyApp from "./containers/MyApp";
import JSONRPCLoggerComponent from "./components/logsReact/logsReact";
import ErrorBoundary from './components/ErrorBoundary';
//import "./userWorker";

// NOTE: This isn't what we want to do here, but it allows us to cross package build 
//TODO: ReactDOM.render(<MyApp />, document.getElementById("root"));

import type { IJSONRPCLog } from "./components/logsReact/logsReact";

export type { IJSONRPCLog as JSONRPCLog };
//export default JSONRPCLogger;

// Keep the app rendering for development
if(process.env.NODE_ENV === 'development') {
  const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
  root.render(<MyApp />);
}

// Wrap the main component
export const JSONRPCLogger = (props: any) => (
  <ErrorBoundary>
    <JSONRPCLoggerComponent {...props} />
  </ErrorBoundary>
);