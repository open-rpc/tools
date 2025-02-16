import * as ReactDOM from "react-dom/client";
import * as React from "react";
import MyApp from "./containers/MyApp";
import { JSONRPCLogger as JSONRPCLoggerComponent , IJSONRPCLog } from "./components/logsReact/logsReact";
import ErrorBoundary from './components/ErrorBoundary';
import "./userWorker";

// NOTE: This isn't what we want to do here, but it allows us to cross package build 
//TODO: ReactDOM.render(<MyApp />, document.getElementById("root"));

// Keep the app rendering for development
if(process.env.NODE_ENV === 'development') {
  const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
  root.render(<MyApp />);
}

// Wrap the main component
const JSONRPCLogger = (props: any) => (
  <ErrorBoundary>
    <JSONRPCLoggerComponent {...props} />
  </ErrorBoundary>
);

export { JSONRPCLogger};
export type { IJSONRPCLog };
export default JSONRPCLogger;
