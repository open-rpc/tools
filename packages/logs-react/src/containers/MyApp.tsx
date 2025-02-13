import React, { useEffect } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material"; //tslint:disable-line
import useMediaQuery from "@mui/material/useMediaQuery";
import makeTheme from "../themes/theme";
import "./MyApp.css";
import JSONRPCLogger, { IJSONRPCLog } from "../components/logsReact/logsReact";
import useWebRequest from "../hooks/useWebRequest";
import * as monaco from "monaco-editor";

const MyApp: React.FC = () => {
  const [newHistory, setHistory] = useWebRequest();
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = React.useMemo(() => makeTheme(prefersDarkMode), [prefersDarkMode]);

  useEffect(() => {
    const t = prefersDarkMode ? "vs-dark" : "vs";
    monaco.editor.setTheme("vs-dark");
  }, [prefersDarkMode, theme]);

  useEffect(() => {
    // Use devtools panels API from Chrome or Firefox
    const devToolsPanels =
      typeof chrome !== "undefined" && chrome.devtools && chrome.devtools.panels
        ? chrome.devtools.panels
        : typeof browser !== "undefined" && browser.devtools && browser.devtools.panels
          ? browser.devtools.panels
          : null;

    if (devToolsPanels) {
      // Create devtools panel for JSONRPCLogger extension
      devToolsPanels.create("JSONRPCLogger", "", "index.html", (panel: any) => {});
    } else {
      const logs: IJSONRPCLog[] = [
        {
          timestamp: new Date(),
          type: "request",
          method: "foo",
          payload: {
            jsonrpc: "2.0",
            method: "foo",
          },
        },
       {
          timestamp: new Date(),
          type: "request",
          method: "foo",
          payload: {
            jsonrpc: "2.0",
            method: "foo",
          },
        },
        {
          timestamp: new Date(),
          type: "response",
          method: "foo",
          payload: {
            jsonrpc: "2.0",
            error: {
              code: 1234,
              message: "potato",
            },
          },
        },
        {
          timestamp: new Date(),
          type: "request",
          method: "foo",
          payload: {
            jsonrpc: "2.0",
            method: "foo",
          },
        },
        {
          timestamp: new Date(),
          type: "response",
          method: "foo",
          payload: {
            jsonrpc: "2.0",
            result: "bar",
          },
        },
        {
          timestamp: new Date(),
          type: "request",
          method: "foo",
          payload: {
            jsonrpc: "2.0",
            method: "foo",
          },
        },
        {
          timestamp: new Date(),
          type: "request",
          method: "potato",
          payload: {
            jsonrpc: "2.0",
            method: "potato",
          },
        },
        {
          timestamp: new Date(),
          type: "response",
          method: "longPotato",
          payload: {
            jsonrpc: "2.0",
            result: {
              foo: "bar",
              baz: "foo",
              bar: "baz",
              listOfNothings: [1, 2, 3, 4, 5, 6, 7, 8],
            },
          },
        },
        {
          timestamp: new Date(),
          type: "request",
          notification: true,
          method: "potato2",
          payload: {
            jsonrpc: "2.0",
            method: "potato2",
          },
        },
        {
          timestamp: new Date(),
          type: "response",
          notification: true,
          method: "potato2",
          payload: {
            jsonrpc: "2.0",
            method: "potato2",
          },
        },
      ];
      setHistory(logs);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // do not render monaco if collapsed -> see docs
  return (
    <ThemeProvider theme={theme}>
      <div>
        <CssBaseline />
        <JSONRPCLogger
          logs={newHistory}
          darkMode={true}
          sidebarAlign="right"
          openrpcDocument={{
            methods: [
              {
                name: "foo",
                description: "potato",
              },
            ],
          } as any}
        />
      </div>
    </ThemeProvider>
  );
};

export default MyApp;
