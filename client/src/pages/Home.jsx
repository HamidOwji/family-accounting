import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const HomePage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        bgcolor: 'background.default',
      }}
    >
      <Typography variant="h3" 
        sx={{
          color: 'text.primary',
          fontSize: '3rem',
          fontWeight: 'bold',
          mb: 2,
        }}
      >
        Family accounting
      </Typography>
      <Typography variant="h5" 
        sx={{
          color: 'secondary.main',
          fontSize: '1.5rem',
          mb: 2,
        }}
      >
        spend your money as smart as possible!
      </Typography>
      <Box
        component="img"
        src='/assets/homepage-figure.png'
        alt="App Photo"
        sx={{
          width: '300px',
          height: 'auto',
          mb: 2,
        }}
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          width: '300px',
        }}
      >
        <Button variant="contained" color="primary">
          Create an Account
        </Button>
        <Button variant="outlined" color="primary">
          Sign In
        </Button>
      </Box>
    </Box>
  );
};

export default HomePage;
