import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import usePostData from '../hooks/usePostData';
import { styles } from '../styles/auth.styles';
import FormManager from '../hoc/FormManager';

export default function Login() {
  const [postData, isLoading, data, error] = usePostData('http://localhost:8000/accounts/api/v1/login/');
  const navigate = useNavigate();

  const handleSubmission = async (formData) => {
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
    // console.log(error);
    // console.log(data);

    if (response.data && response.data.error) {
      alert(response.data.error);
  } else if (response.data && response.data.success) {
      navigate('/operations');
  } else {
      alert('Unknown error');
  }

  };

  return (
    <FormManager
      initialValues={{ email: '', password: '' }}
      onSubmit={(formData) => handleSubmission(formData)}
    >
      {({ formData, handleChange, handleSubmit }) => (
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
              onSubmit={handleSubmit}
            >
              <TextField
                label="Email"
                variant="outlined"
                name='email'
                value={formData.email}
                onChange={handleChange}
              />
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
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Login!'}
              </Button>
              <Typography variant="body2" sx={{ mt: 2 }}>
                <Link to="/forgot-password" style={{ textDecoration: 'none', color: 'inherit' }}>
                  Forgot Password?
                </Link>
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
    </FormManager>
  );
}
