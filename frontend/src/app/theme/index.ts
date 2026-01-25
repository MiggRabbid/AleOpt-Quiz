import { createTheme } from '@mui/material';
import { ruRU } from '@mui/material/locale';

export const customThemeMUI = createTheme(
  {
    typography: {
      fontFamily: `'Roboto', sans-serif`,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      fontWeightBold: 700,
    },
    palette: {
      primary: {
        main: '#007a55',
        contrastText: '#fff',
      },
      secondary: {
        main: '#ff8904',
        contrastText: '#fff',
      },
      error: {
        main: '#c70036',
        contrastText: '#fff',
      },
      warning: {
        main: '#ff8904',
        contrastText: '#fff',
      },
      info: {
        main: '#007a55',
        contrastText: '#fff',
      },
      success: {
        main: '#007a55',
        contrastText: '#fff',
      },
    },
    components: {
      MuiAccordion: {
        styleOverrides: {
          root: {
            boxShadow: 'none',
          },
        },
      },
    },
  },
  ruRU,
);
