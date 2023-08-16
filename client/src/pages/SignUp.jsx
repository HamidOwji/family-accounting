import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import usePostData from '../hooks/usePostData';
import { styles } from '../styles/auth.styles';
import FormManager from '../hoc/FormManager';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {

  const [postData, isLoading, data, error] = usePostData('http://localhost:8000/accounts/api/v1/users/');

  const [emailErrors, setEmailErrors] = React.useState('')
  const [passwordErrors, setPasswordErrors] = React.useState('')

  const navigate = useNavigate()
  
  const handleSubmit = async (formData) => {
    
    const { email, password, repeatPassword } = formData
    if (password === repeatPassword) {
      const re = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
      if (re.test(email)) {

        setEmailErrors('')
        setPasswordErrors('')

        const dataToSend = {
          email: email,
          password: password,
          password2: repeatPassword,
        };
        const response = await postData(dataToSend);

        if (response.status === 201) {
          navigate('/login');
        } else {
          // Display the error message from the server
          alert(response.data.error || 'Unknown error');
          console.log('Server response:', response);
        }
      } else {
        setEmailErrors('Please insert email in correct format')
        return
      }
    } else {
      setPasswordErrors('passwords do not match')
      return
    }
  }

  return (
    <FormManager
    initialValues={{email: '', password: '', repeatPassword: '', }}
    onSubmit={(formData) => handleSubmit(formData)}
    >
      {({ formData, handleChange, handleSubmit }) => (
        <Box sx={styles.mainBox}>
          <Box sx={styles.innerBox}>
            <Typography variant="h3" sx={styles.heading}>
              Sign up!
            </Typography>
            <Box component="form"
              sx={styles.form}
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit}>
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
              {error && <Box>
                {error && typeof error === 'object' ? JSON.stringify(error) : error}
              </Box>}
              <Button
                variant="contained"
                color="secondary"
                type='submit'>
                Sign up!
              </Button>
            </Box>
          </Box>
          <Box>
          </Box>
        </Box>
      )}
    </FormManager>
  );
}