import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom'

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
        pt: '1rem',
        pb: '1rem',
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
          width: '100%',
          height: 'auto',
          mb: 2,
          filter: 'opacity(50%)',
        }}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          width: '10rem',
          gap: '1rem',
        }}
      >
        <Button variant="contained" color="secondary" component={Link} to="/signup">
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
