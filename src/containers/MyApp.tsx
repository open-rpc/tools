import React from "react";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core"; //tslint:disable-line
import useDarkMode from "use-dark-mode";
import { lightTheme, darkTheme } from "../themes/theme";
import "./MyApp.css";
import JSONRPCLogger from "../components/logsReact/logsReact";
import useWebRequest from "../hooks/useWebRequest";

const MyApp: React.FC = () => {
  const darkMode = useDarkMode();
  const theme = darkMode.value ? darkTheme : lightTheme;

  /*const logs: IJSONRPCLog[] = [{
		timestamp: new Date(),
		payload: {
			jsonrpc: "2.0",
			method: "foo",
		},
	}];*/

  // Create devtools panel for JSONRPCLogger extension
  chrome.devtools.panels.create("JSONRPCLogger",
    "",
    "index.html",
    (panel) => { return; },

  );

  const [newHistory] = useWebRequest();

  // do not render monaco if collapsed -> see docs
  return (
    <MuiThemeProvider theme={theme}>
      <div>
        <CssBaseline />
        <JSONRPCLogger logs={newHistory} />
      </div>
    </MuiThemeProvider >
  );
};

export default MyApp;
