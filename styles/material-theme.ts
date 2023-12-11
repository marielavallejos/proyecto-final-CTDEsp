import {createTheme} from "@mui/material";

export const theme = createTheme({
    palette: {
        primary: {
            main: '#4BC6B9',
        },
        secondary: {
            main: '#0B3954',
        },
    },
    typography: {
        fontFamily: 'Roboto, sans-serif'
    },
    breakpoints: {
        values: {
          xs: 0,
          sm: 600,
          md: 960,
          lg: 1280,
          xl: 1920,
        },
      },
});
/*
height: 100px;
max-width: 1490px;

background: #F7F7FF;
margin-top: 17px;
height: 10px;

*/