import * as React from "react";
import { useEffect } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";

import { lightTheme, darkTheme } from "../themes/openrpcTheme";
import useDarkMode from "use-dark-mode";
import Inspector from "./Inspector";
import useQueryParams from "../hooks/useQueryParams";
//import "./userWorker";
import * as monaco from "monaco-editor";
import useOpenrpcDocument from "../hooks/useOpenrpcDocument";


const App: React.FC = () => {
  const darkMode = useDarkMode();
  const [query] = useQueryParams();
  const theme = darkMode.value ? darkTheme : lightTheme;
  const openrpcDocument = useOpenrpcDocument(query.openrpcDocument as string | undefined, query.schemaUrl as string | undefined);

  useEffect(() => {
    const t = darkMode.value ? "vs-dark" : "vs";
    monaco.editor.setTheme(t);
  }, [darkMode.value]);

  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Inspector
        onToggleDarkMode={darkMode.toggle}
        darkMode={darkMode.value}
        customTransport={query.customTransport as any}
        transport={query.transport as any}
        url={query.url as string | undefined}
        openrpcDocument={openrpcDocument}
        request={query.request}
      />
    </ThemeProvider>
  );
};

export default App;
