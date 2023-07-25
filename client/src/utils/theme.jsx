// src/utils/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
      primary: {
        main: '#2DBD88',
        contrastText: '#212427',
      },
      secondary: {
        main: '#004561',
        contrastText: '#FFFFFF',
      },
      background: {
        default: '#FFFFD9',
      },
      text: {
        primary: '#212427',
        secondary: '#FFFFFF',
      },
    },
  });
  

export default theme;
