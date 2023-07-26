import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';


export default function Signup() {

    const [formData, setFormData] = React.useState({
      email: '',
      password: '',
      repeatPassword: '',
    })

    function handleChange(event){
      setFormData(prevFormData => {
        return {
          ...prevFormData,
          [event.target.name]: event.target.value,
        }
      })
    }

    const [emailErrors, setEmailErrors] = React.useState('')
    const [passwordErrors, setPasswordErrors] = React.useState('')

    function handleSubmit(event){
      event.preventDefault()
      const { email, password, repeatPassword } = formData
      if (password === repeatPassword){
        const re = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        if (re.test(email)){
          setEmailErrors('')
          setPasswordErrors('')
          console.log('Okay')
        }else{
          setEmailErrors('Please insert email in correct format')
          return
        }
      }else{
        setPasswordErrors('passwords do not match')
        return
      }
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
        <TextField
          label="Email"
          variant="outlined"
          name='email'
          value={formData.email}
          onChange={handleChange} />
        {emailErrors && <Box>{emailErrors}</Box>}
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          name='password'
          value={formData.password}
          onChange={handleChange} 
          />
        <TextField
          label="Repeat Password"
          type="password"
          variant="outlined"
          name='repeatPassword'
          value={formData.repeatPassword}
          onChange={handleChange} 
          />
        {passwordErrors && <Box>{passwordErrors}</Box>}
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