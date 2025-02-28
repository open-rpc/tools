import { createTheme, Theme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

const baseTheme = {
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          transition: 'background-color 0.2s ease, color 0.2s ease',
        },
      },
    },
  },
};

export const lightTheme: Theme = createTheme({
  ...baseTheme,
  components: {
    ...baseTheme.components,
    MuiAppBar: {
      defaultProps: {
        position: 'sticky',
      },
      styleOverrides: {
        root: {
          backgroundColor: 'transparent !important',
        },
        colorDefault: {
          background: 'transparent !important',
        },
        colorPrimary: {
          background: 'transparent !important',
        },
      },
    },
    MuiCard: {
      defaultProps: {
        elevation: 0,
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
  },
  palette: {
    mode: 'light',
    background: {
      default: '#fff',
      paper: '#fff',
    },
    text: {
      primary: grey[900],
      secondary: grey[700],
    },
  },
});

export const darkTheme: Theme = createTheme({
  ...baseTheme,
  components: {
    ...baseTheme.components,
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
          backgroundColor: grey[900],
          color: grey[100],
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
          color: grey[100],
          '& a': {
            color: grey[100],
          },
          '& h1, & h2, & h3, & h4, & h5, & h6': {
            color: grey[100],
          },
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          backgroundColor: grey[900],
          color: grey[100],
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          color: grey[100],
          '& .MuiAccordionSummary-expandIconWrapper': {
            color: `${grey[100]} !important`,
          },
          '& .MuiAccordionSummary-expandIconWrapper svg': {
            color: `${grey[100]} !important`,
          },
        },
        content: {
          color: grey[100],
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          color: grey[100],
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          color: grey[100],
          borderBottom: `1px solid ${grey[800]}`,
        },
        head: {
          color: `${grey[100]} !important`,
          backgroundColor: grey[900],
          fontWeight: 500,
          '&, & *': {
            color: `${grey[100]} !important`,
          },
          '& .MuiSvgIcon-root': {
            color: grey[100],
          },
        },
        alignRight: {
          color: `${grey[100]} !important`,
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: grey[100],
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: grey[100],
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          color: grey[100],
        },
        secondary: {
          color: grey[400],
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          color: grey[100],
          '& .MuiTypography-root': {
            color: grey[100],
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: grey[100],
          '& .MuiSvgIcon-root': {
            color: grey[100],
          },
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

export default {
  darkTheme,
  lightTheme,
};
