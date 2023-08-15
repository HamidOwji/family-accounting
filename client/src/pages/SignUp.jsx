import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import usePostData from '../hooks/usePostData';
import { styles } from '../styles/auth.styles';

export default function SignUp() {

  const [postData, isLoading, data, error] = usePostData('http://localhost:8000/accounts/api/v1/users/');
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
    repeatPassword: '',
  })

  function handleChange(event) {
    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      }
    })
  }

  const [emailErrors, setEmailErrors] = React.useState('')
  const [passwordErrors, setPasswordErrors] = React.useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
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
        await postData(dataToSend);

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
    <Box sx={styles.mainBox}>
      <Box sx={styles.innerBox}>
        <Typography variant="h3" sx={styles.heading}>
          Sign up!
        </Typography>
        <Box component="form" sx={styles.form} noValidate autoComplete="off">
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
            onClick={handleSubmit}>
            Sign up!
          </Button>
        </Box>
      </Box>
      <Box>
      </Box>
    </Box>
  );
}