import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import usePostData from '../hooks/usePostData';


export default function Login() {

    const [postData, isLoading, data, error] = usePostData('http://localhost:8000/accounts/api/v1/users/');
    const [formData, setFormData] = React.useState({
      email: '',
      password: '',
    })

    function handleChange(event){
      setFormData(prevFormData => {
        return {
          ...prevFormData,
          [event.target.name]: event.target.value,
        }
      })
    }

    const handleSubmit = async (event) => {
      event.preventDefault()
      const { email, password } = formData

          const dataToSend = {
            email: email,
            password: password,
            password2: repeatPassword,
          };
          await postData(dataToSend);
    }

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
        Login!
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
        <TextField
          label="Email"
          variant="outlined"
          name='email'
          value={formData.email}
          onChange={handleChange} />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          name='password'
          value={formData.password}
          onChange={handleChange} 
          />
        <Button
         variant="contained"
         color="secondary"
         onClick={handleSubmit}>
          Sign up!
        </Button>
      </Box>
    </Box>
    </Box>
  );
}