import React from "react";
import { MuiThemeProvider, AppBar, Toolbar, Typography, IconButton, Tooltip, CssBaseline, Grid } from "@material-ui/core"; //tslint:disable-line
import useDarkMode from "use-dark-mode";
import Brightness3Icon from "@material-ui/icons/Brightness3";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import { lightTheme, darkTheme } from "../themes/theme";
import { useTranslation } from "react-i18next";
import LanguageMenu from "./LanguageMenu";

import "./MyApp.css";
import Introspector, {JSONRPCLog} from "../components/Introspector";

const MyApp: React.FC = () => {
  const darkMode = useDarkMode();
  const { t } = useTranslation();
  const theme = darkMode.value ? darkTheme : lightTheme;

  const logs: JSONRPCLog[] = [{
    timestamp: new Date(),
    payload: {
        jsonrpc: "2.0",
        method: "foo"
    }
  }];

  return (
    <MuiThemeProvider theme={theme}>
      <AppBar position="sticky" color="default" elevation={0}>
        <Toolbar>
          <Grid container alignContent="center" alignItems="center" justify="space-between">
            <Typography variant="h6">{t("Pristine")}</Typography>
            <Typography variant="caption">typescript-react-material-ui</Typography>
            <Grid item>
              <LanguageMenu />
              <Tooltip title={t("Toggle Dark Mode")}>
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
          <Introspector logs={logs}/>
          <Typography variant="caption" style={{ position: "absolute", bottom: "10px" }}>
            {t("Date", { date: new Date() })}
          </Typography>
        </Grid>
      </div>
    </MuiThemeProvider >
  );
};

export default MyApp;
