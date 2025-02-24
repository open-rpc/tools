import * as ReactDOM from "react-dom/client";
import * as React from "react";
import App from "./containers/App";
import "./App.css";
import "./splitpane.css";
import "./containers/userWorker";
import Inspector from "./containers/Inspector";


if(process.env.NODE_ENV === 'development') {
  const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
  root.render(<App />);
}
  

export { Inspector };
export default Inspector;