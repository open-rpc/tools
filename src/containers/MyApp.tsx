import React, { useState, useEffect } from "react";
import { MuiThemeProvider, AppBar, Toolbar, Typography, IconButton, Tooltip, CssBaseline, Grid } from "@material-ui/core"; //tslint:disable-line
import useDarkMode from "use-dark-mode";
import Brightness3Icon from "@material-ui/icons/Brightness3";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import { lightTheme, darkTheme } from "../themes/theme";
import "./MyApp.css";
import JSONRPCLogger, { IJSONRPCLog } from "../components/logs-react";
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
      <AppBar position="sticky" color="default" elevation={0}>
        <Toolbar>
          <Grid container alignContent="center" alignItems="center" justify="space-between">
            <Typography variant="h6">{"JSONRPCLogger"}</Typography>
            <Typography variant="caption">typescript-react-material-ui</Typography>
            <Grid item>
              <Tooltip title={"Toggle Dark Mode"}>
                <IconButton onClick={darkMode.toggle}>
                  {darkMode.value ? <Brightness3Icon /> : <WbSunnyIcon />}
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <div>
        <CssBaseline />
        <JSONRPCLogger logs={newHistory} />
      </div>
    </MuiThemeProvider >
  );
};

export default MyApp;
