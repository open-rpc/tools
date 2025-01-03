import { createTheme } from "@mui/material/styles";

export const darkTheme = (prefersDarkMode: boolean) => {
  return createTheme({
    components: {
      MuiAppBar: {
        defaultProps: {
          position: "sticky",
        },
        styleOverrides: {
          root: {
            background: "transparent !important",
          },
        }
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
        }
      }
    },
    palette: {
      mode: prefersDarkMode ? "dark" : "light",
    },
  });
};
export default darkTheme;
