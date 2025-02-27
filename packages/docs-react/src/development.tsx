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
  "openrpc": "1.2.6",
  "externalDocs": {
    "description": "nice",
    "url": "http://super.nice"
  },
  "servers": [
  ],
  "info": {
    "title": "Minimal OpenRPC Example",
    "version": "1.0.0",
    "description": "Food",
    "contact": {
      "email": "hhh@h.com",
      "name": "John",
      "url": "Https://www.google.com"
    },
    "license": {
      "name": "aapp",
      "url": "http:nada"
    },
    "termsOfService": "http://"
  },
  "methods": [
    {
      "name": "getExampleData",
      "summary": "Retrieves example data from the API.",
      "params": [
        {
          "name": "dataId",
          "schema": {
            "type": "integer",
            "description": "The ID of the data to retrieve."
          },
          "required": true
        }
      ],
      "errors": [
        { "$ref": "#/components/x-error-group/GasErrors/0" },
        { "$ref": "#/components/x-error-group/GasErrors/1" }
      ],
      "x-error-group": [
        {
          "$ref": "#/components/x-error-group/GasErrors"
        },
        [
          {
            "code": 50000,
            "message": "Other Not Found",
            "data": "The requested data was not found."
          },
          {
            "code": 50001,
            "message": "Other Bad Request",
            "data": "The request was invalid."
          }
        ]
      ],
      "result": {
        "name": "exampleData",
        "schema": {
          "type": "object",
          "properties": {
            "id": {
              "type": "integer",
              "description": "The ID of the data."
            },
            "data": {
              "type": "string",
              "description": "The content of the data."
            }
          },
          "required": ["id", "data"]
        },
        "description": "The result object containing the requested data."
      }
    }
  ],
  "x-extensions": [
    {
      "openrpcExtension": "0.0.0-development",
      "name": "x-error-group",
      "version": "0.0.1",
      "description": "Describe an error group for OpenRPC methods",
      "summary": "OpenRPC Error Groups",
      "externalDocumentation": {
        "description": "github",
        "url": "https://github.com/open-rpc/specification-extensions-spec/examples/x-notification-openrpc-ext.json"
      },
      "restricted": ["methodObject"],
      "schema": {
      "type": "array",
      "items": {
        "oneOf": [
          {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "code": {
                  "type": "integer",
                  "description": "The code of the error."
                },
                "message": {
                  "type": "string",
                  "description": "The message of the error."
                },
                "data": {
                  "type": "string",
                  "description": "The data of the error."
                }
              },
              "required": ["code", "message"]
            }
          },
          {
            "type": "object",
            "properties": {
              "$ref": {
                "type": "string"
              }
            },
            "required": ["$ref"]
          }
        ]
      }
    }
    }
  ],
  "components": {
    "x-error-group": {
      "GasErrors": [
        {
          "code": -31999,
          "message": "Gas too low",
          "data": "The gas is too low."
        },
        {
          "code": -31998,
          "message": "out of gas",
          "data": "The gas is out of gas."
        }
      ]
    },
    "schemas": {
      "ErrorData": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "code": { "type": "integer" },
            "message": { "type": "string" },
            "data": { "type": "string" }
          },
          "required": ["code", "message", "data"]
        }
      },
      "GasErrors": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "code": { "type": "integer" },
            "message": { "type": "string" },
            "data": { "type": "string" }
          },
          "required": ["message", "data"],
          "enum": [
            {
              "code": -31999,
              "message": "Gas too low",
              "data": "The gas is too low."
            },
            {
              "code": -31998,
              "message": "out of gas",
              "data": "The gas is out of gas."
            }
          ]
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
