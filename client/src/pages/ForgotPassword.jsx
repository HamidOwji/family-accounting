import React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import usePostData from '../hooks/usePostData';
import { styles } from '../styles/auth.styles';
import FormManager from '../hoc/FormManager';

export default function ForgotPassword() {
  const [postData, isLoading] = usePostData('http://localhost:8000/accounts/api/v1/password-reset/');
  const navigate = useNavigate();

  const handleSubmission = async (formData) => {
    if (formData.email === '') {
        alert('Email is required.');
        return;
    }

    const { email } = formData;
    const dataToSend = { email };

    try {
        const response = await postData(dataToSend);

        if (response && response.data && response.data.detail) {
            alert(response.data.detail);  // Use the detail message from the response
            navigate('/login');
        } else {
            alert(response.data.error || 'Unknown error');
        }
    } catch (error) {
        console.error("Error during password reset request:", error);
        alert('An error occurred. Please try again later.');
    }
};

  return (
    <FormManager
      initialValues={{ email: '' }}
      onSubmit={(formData) => handleSubmission(formData)}
    >
      {({ formData, handleChange, handleSubmit }) => (
        <Box sx={styles.mainBox}>
          <Box sx={styles.innerBox}>
            <Typography variant="h3" sx={styles.heading}>
              Forgot Password
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
              <Button
                variant="contained"
                color="secondary"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'Sending...' : 'Send'}
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </FormManager>
  );
}
