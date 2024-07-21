import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#084b73', // Navy
    },
    secondary: {
      main: '#0fa7de', // Light blue
    },
    success: {
      main: '#c3d700', // Green
    },
    warning: {
      main: '#ff7f02', // Orange
    },
    white: {
        main: '#f5f5f5', // White text
    },
    background: {
      default: '#f5f5f5', // Light background
      paper: '#ffffff', // White paper background
    },
    text: {
      primary: '#084b73', // Navy text
      secondary: '#0fa7de', // Light blue text
      white: '#f5f5f5', // White text
    },
  },
  typography: {
    h4: {
      color: '#084b73', // Navy color for h4
    },
    h6: {
      color: '#084b73', // Navy color for h6
    },
  },
});

export default theme;
