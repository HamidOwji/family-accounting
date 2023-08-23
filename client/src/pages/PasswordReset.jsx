import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import usePostData from '../hooks/usePostData';
import { styles } from '../styles/auth.styles';
import FormManager from '../hoc/FormManager';

export default function ResetPassword() {
    const { token } = useParams();
    const decodedToken = atob(token);
    const [postData, isLoading] = usePostData(`http://localhost:8000/accounts/api/v1/password-reset/confirm/${decodedToken}/`);
    const navigate = useNavigate();
    const handleSubmission = async (formData) => {

      if (formData.password !== formData.password_confirm) {
        alert('Passwords do not match.');
        return;
      }
        const dataToSend = { password: formData.password, password_confirm: formData.password_confirm };


        try {
            const response = await postData(dataToSend);

            if (response && response.data && response.data.detail) {
                alert(response.data.detail);
                navigate('/login');
            } else {
                alert(response.data.error || 'Unknown error');
            }
        } catch (error) {
            console.error("Error during password reset:", error);
            alert('An error occurred. Please try again later.');
        }
    };

    return (
        <FormManager
            initialValues={{ password: '', password_confirm: '' }}
            onSubmit={(formData) => handleSubmission(formData)}
        >
            {({ formData, handleChange, handleSubmit }) => (
                <Box sx={styles.mainBox}>
                    <Box sx={styles.innerBox}>
                        <Typography variant="h3" sx={styles.heading}>
                            Reset Password
                        </Typography>
                        <Box
                            component="form"
                            sx={styles.form}
                            noValidate
                            autoComplete="off"
                            onSubmit={handleSubmit}
                        >
                            <TextField
                                label="New Password"
                                variant="outlined"
                                name='password'
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <TextField
                                label="Confirm New Password"
                                variant="outlined"
                                name='password_confirm'
                                type="password"
                                value={formData.password_confirm}
                                onChange={handleChange}
                            />
                            <Button
                                variant="contained"
                                color="secondary"
                                type="submit"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Resetting...' : 'Reset Password'}
                            </Button>
                        </Box>
                    </Box>
                </Box>
            )}
        </FormManager>
    );
}
