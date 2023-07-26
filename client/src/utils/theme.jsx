// src/utils/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          root: { // style rule
            borderRadius: '0.8rem',  // Make button rounded
            height: '3rem',        // Specify height
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: '#004561',
            "&.Mui-focused": {
              color: '#004561', // Change label color on focus
            }, // changes the color of the label
            fontWeight: 'bold', // makes the label text bold
            fontSize: '1rem',
            // add more styles as needed
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: '.8rem',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#004561', // change border color here
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#004561', // change hover color here
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#004561', // change focused color here
            },
          },
        },
      },
    },
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
        white: '#fff'
      },
      text: {
        primary: '#212427',
        secondary: '#FFFFFF',
      },
    },
  });
  

export default theme;
