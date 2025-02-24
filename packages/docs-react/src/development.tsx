/* eslint-disable */
import React from 'react';
import { createRoot } from 'react-dom/client';
import { OpenrpcDocument } from '@open-rpc/meta-schema';
import Documentation from './Documentation';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { grey } from '@mui/material/colors';

// Create dark theme
const darkTheme2 = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#ce93d8',
    },
  },
});

const schema: OpenrpcDocument = {
  openrpc: "1.2.6",
  info: {
    title: "Example API",
    version: "1.0.0",
    description: "Example API demonstrating OpenRPC schema"
  },
  methods: [
    {
      name: "echo",
      description: "Echo back the input params",
      params: [
        {
          name: "message",
          description: "Message to echo",
          schema: { type: "string" }
        }
      ],
      result: {
        name: "echoResult",
        description: "The echoed message",
        schema: { type: "string" }
      }
    },
    {
      name: "add",
      description: "Add two numbers",
      params: [
        {
          name: "a",
          description: "First number",
          schema: { type: "number" }
        },
        {
          name: "b", 
          description: "Second number",
          schema: { type: "number" }
        }
      ],
      result: {
        name: "sum",
        description: "The sum of the two numbers",
        schema: { type: "number" }
      }
    }
  ],
  components: {
    schemas: {
      Error: {
        type: "object",
        properties: {
          code: { type: "integer" },
          message: { type: "string" }
        }
      }
    }
  }
};
 const appBarUISchema = {
    appBar: {["ui:title"]: "Example API",
    ["ui:logoUrl"]: "https://example.com/logo.png",
    ["ui:input"]: true,
    ["ui:inputPlaceholder"]: "Search...",
    ["ui:splitView"]: true,
    ["ui:darkMode"]: false,
    ["ui:examplesDropdown"]: true,
    ["ui:edit"]:false,   
    ["ui:transports"]: false,
    },
    methods: {
      ["ui:methodPlugins"]: true,
      ["ui:defaultExpanded"]: true,
    },
    params: {
      ["ui:defaultExpanded"]: true,
    }
  };

const reactJsonOptions = {
  theme: "summerfruit:inverted",
  collapseStringsAfterLength: 25,  // <-- This is the culprit
  displayDataTypes: false,
  displayObjectSize: false,
  indentWidth: 2,
  name: false,
}
export const darkTheme = createTheme({
  components: {
    MuiAppBar: {
      defaultProps: {
        position: 'sticky',
      },
      styleOverrides: {
        root: {
          background: 'transparent !important',
        },
        colorPrimary: {
          background: 'transparent !important',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          zIndex: 1,
          opacity: 1,
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          background: 'transparent !important',
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          background: 'transparent !important',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: grey[400],
        },
      },
    },
  },
  palette: {
    mode: 'dark',
    background: {
      default: grey[900],
      paper: grey[900],
    },
    text: {
      primary: grey[100],
      secondary: grey[400],
    },
  },
});


const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');
const root = createRoot(container);

root.render(
  <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <div style={{ minHeight: '100vh', backgroundColor: darkTheme.palette.background.default }}>
      <Documentation schema={schema} uiSchema={appBarUISchema} reactJsonOptions={reactJsonOptions} />
    </div>
  </ThemeProvider>
);
