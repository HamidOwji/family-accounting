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
          fontSize: '2rem',
          fontWeight: 'bold',
          textAlign: 'center',
          mb: 2,
          pr: 3,
          pl: 3,
        }}
      >
        Family accounting
      </Typography>
      <Typography variant="h5" 
        sx={{
          color: 'secondary.main',
          fontSize: '1.5rem',
          textAlign: 'center',
          mb: 2,
          pr: 3,
          pl: 3,
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
          flexDirection: 'column',
          justifyContent: 'space-around',
          width: '12rem',
          gap: '1rem',
        }}
      >
        <Button  variant="contained" color="secondary">
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
