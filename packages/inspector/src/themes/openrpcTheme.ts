import { createTheme } from "@mui/material/styles";
import grey from "@mui/material/colors/grey";

export const lightTheme = createTheme({
  components: {
    MuiAppBar: {
      defaultProps: {
        position: "sticky",
      },
      styleOverrides: {
        root: {
          background: "#fff !important",
        },
      },
    },
    MuiCard: {
      defaultProps: {
        elevation: 0,
      },
    },
  },
  palette: {
    mode: "light",
    background: {
      default: "#fff",
    },
  },
});

export const darkTheme = createTheme({
  components: {
    MuiAppBar: {
      defaultProps: {
        position: "sticky",
      },
      styleOverrides: {
        root: {
          background: "transparent !important",
        },
      },
    },
    MuiCard: {
      defaultProps: {
        elevation: 0,
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          background: "transparent !important",
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
    mode: "dark",
    background: {
      default: grey[900],
      paper: grey[800],
    },
  },
});

export default {
  darkTheme,
  lightTheme,
};
