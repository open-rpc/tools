import { createMuiTheme } from "@material-ui/core/styles";
import grey from "@material-ui/core/colors/grey";

export const darkTheme = (prefersDarkMode: boolean) => {
  return createMuiTheme({
    props: {
      MuiAppBar: {
        position: "sticky",
      },
      MuiCard: {
        elevation: 0,
      },
    },
    palette: {
      type: prefersDarkMode ? "dark" : "light",
    },
    overrides: {
      MuiAppBar: {
        root: {
          background: "transparent !important",
        },
      },
      MuiTable: {
        root: {
          background: "transparent !important",
        },
      },
    },
  });
}
export default darkTheme;
