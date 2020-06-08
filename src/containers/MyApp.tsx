import React from "react";
import { MuiThemeProvider, CssBaseline, AppBar, Tooltip, IconButton } from "@material-ui/core"; //tslint:disable-line
import useDarkMode from "use-dark-mode";
import { lightTheme, darkTheme } from "../themes/theme";
import "./MyApp.css";
import JSONRPCLogger from "../components/logsReact/logsReact";
import useWebRequest from "../hooks/useWebRequest";
import Brightness3Icon from "@material-ui/icons/Brightness3";
import WbSunnyIcon from "@material-ui/icons/WbSunny";

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
      <AppBar position="sticky" color="default" elevation={0}>
        <Tooltip title={("Toggle Dark Mode")}>
          <IconButton onClick={darkMode.toggle}>
            {darkMode.value ? <Brightness3Icon /> : <WbSunnyIcon />}
          </IconButton>
        </Tooltip>
      </AppBar>
      <div>
        <CssBaseline />
        <JSONRPCLogger logs={newHistory} />
      </div>
    </MuiThemeProvider >
  );
};

export default MyApp;
