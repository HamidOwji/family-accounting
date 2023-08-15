import React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import usePostData from '../hooks/usePostData';
import { styles } from '../styles/auth.styles';

export default function Login() {

  const [postData, isLoading, data, error] = usePostData('http://localhost:8000/accounts/api/v1/login/');
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
  })
  const navigate = useNavigate();

  function handleChange(event) {
    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      }
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.email === '' || formData.password === '') {
      alert('Email and password are required.');
      return;
    }

    const { email, password } = formData;

    const dataToSend = {
      email: email,
      password: password,
    };

    const response = await postData(dataToSend);
    // console.log("Response:", response);

    if (response.data && response.data.success) {
      navigate('/operations');
    } else {
      // Display the error message from the server
      alert(response.data.error || 'Unknown error');
    }
  }


  return (
    <Box sx={styles.mainBox}>
      <Box sx={styles.innerBox}>
        <Typography variant="h3" sx={styles.heading}>
          Login!
        </Typography>
        <Box
          component="form"
          sx={styles.form}
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
            onClick={handleSubmit}
            disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login!'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}