// Roland Garros-inspired theme for Material UI
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#e57200', // clay orange
    },
    secondary: {
      main: '#2e6e4c', // green
    },
    background: {
      default: '#f7f4ed', // off-white
      paper: '#fff',
    },
    text: {
      primary: '#2e2e2e',
      secondary: '#2e6e4c',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial',
  },
});

export default theme;
