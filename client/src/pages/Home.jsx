import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom'
import { styles } from '../styles/home.styles'

const HomePage = () => {
  return (
    <Box sx={styles.mainBox}>
      <Typography variant="h3" sx={styles.heading} >
        Family accounting
      </Typography>
      <Typography variant="h5" sx={styles.subHeading} >
        spend your money as smart as possible!
      </Typography>
      <Box
        component="img"
        src='/assets/homepage-figure.png'
        alt="App Photo"
        sx={styles.img}
      />
      <Box sx={styles.buttonBox} >
        <Button variant="contained" color="secondary" component={Link} to="/sign-up">
          Sign up!
        </Button>
        <Button variant="outlined" color="primary" component={Link} to="/login">
          Sign In
        </Button>
      </Box>
    </Box>
  );
};

export default HomePage;
