import React from "react";
import { MuiThemeProvider, AppBar, Toolbar, Typography, IconButton, Tooltip, CssBaseline, Grid } from "@material-ui/core"; //tslint:disable-line
import useDarkMode from "use-dark-mode";
import Brightness3Icon from "@material-ui/icons/Brightness3";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import { lightTheme, darkTheme } from "../themes/theme";
import "./MyApp.css";
import Introspector, {IJSONRPCLog} from "../components/Introspector";
import useWebRequest from "../hooks/useWebRequest";

const MyApp: React.FC = () => {
  const darkMode = useDarkMode();
  const theme = darkMode.value ? darkTheme : lightTheme;
  const [history] = useWebRequest();
  console.log(history);

  const logs: IJSONRPCLog[] = [{
    timestamp: new Date(),
    payload: {
        jsonrpc: "2.0",
        method: "foo",
    },
  }];

  return (
    <MuiThemeProvider theme={theme}>
      <AppBar position="sticky" color="default" elevation={0}>
        <Toolbar>
          <Grid container alignContent="center" alignItems="center" justify="space-between">
            <Typography variant="h6">{"Introspector"}</Typography>
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
        <Grid container alignContent="center" alignItems="center" justify="center" direction="column">
          <Introspector logs={logs} />
        </Grid>
      </div>
    </MuiThemeProvider >
  );
};

export default MyApp;
