import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';


export default function Signup() {

  
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
    <Box
    sx={{
      border: '2px solid', 
      borderColor: 'secondary.main', 
      borderRadius: '1.5rem', 
      width: '18rem', 
      height: '28rem', 
      display: 'flex',
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      bgcolor: 'background.white',
      p: '1rem',  
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
        Sign up!
      </Typography>
      <Box
        component="form"
        sx={{
          display: 'flex',  
          flexDirection: 'column',  
          alignItems: 'center',  
          justifyContent: 'center',
          '& > :not(style)': { m: 1, width: '12rem' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField id="outlined-basic" label="Email" variant="outlined" />
        <TextField id="outlined-basic" label="Password" variant="outlined" />
        <TextField id="outlined-basic" label="Repeat Password" variant="outlined" />
        <Button variant="contained" color="secondary" component={Link} to="/">
          Sign up!
        </Button>
      </Box>
    </Box>

    </Box>
  );
}