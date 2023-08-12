import React, { useState, useEffect } from 'react'
import { TextField, Box, MenuItem, Select, InputLabel, FormControl, Button, Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';
import CustomDropdown from './CustomDropdown';
import axios from '../config/axiosConfig';

export default function IncomeDetails() {
    const [formData, setFormData] = useState({
        income_category: '',
        amount: '',
        description: '',
    })
    const [categories, setCategories] = useState([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    // helper function for axios
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    // fetch categories from the backend when component mounts
    useEffect(() => {
        const token = getCookie('JWT_COOKIE_FAMILY_ACCOUNTING');
        axios.get('http://localhost:8000/finances/api/v1/income-category/', {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            withCredentials: true  // to ensure cookies are sent with the request
        })
        .then(response => {
            setCategories(response.data);
            if(response.data[0] && response.data[0].id) {
                setFormData(prevFormData => ({
                    ...prevFormData,
                    income_category: response.data[0].id
                }));
            }
        });

    }, []);
    

    function handleChange(event) {
        setFormData(prevFormData => {
            return (
                {
                    ...prevFormData,
                    [event.target.name]: event.target.value
                }
            )
        })
    }

    function handleSubmit(event) {
        event.preventDefault();
        
        const token = getCookie('JWT_COOKIE_FAMILY_ACCOUNTING'); // Fetch JWT token from the cookie
    
        axios.post('http://localhost:8000/finances/api/v1/income-item/', formData, { // Replace 'income-endpoint' with your actual endpoint
            headers: {
                'Authorization': `Bearer ${token}`, // Add JWT token to the Authorization header
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })
        .then(response => {
            setOpenSnackbar(true);
            // Handle successful save, maybe notify the user or navigate away
        })
        .catch(error => {
            // Handle errors
        });
    }

    function handleCloseSnackbar(event, reason) {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };
    

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '60%',
                mt: 3,
                gap: '1.2rem',
            }}
        >

            <CustomDropdown
                items={categories}
                value={formData.income_category}
                onChange={handleChange}
                name="income_category"
                label="Income category"
            />

            <TextField
                name="amount"
                label="Amount"
                variant="outlined"
                fullWidth
                type="number"
                value={formData.amount}
                onChange={handleChange}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 0,
                    },
                    '& .MuiInputLabel-root': {
                        fontSize: '0.8rem',
                        fontWeight: 'regular',
                    },
                    '& .MuiOutlinedInput-input': {
                        height: '1rem',
                    },
                }}
            />
            <TextField
                name="description"
                label="Description"
                variant="outlined"
                fullWidth
                multiline
                rows={2}
                value={formData.description}
                onChange={handleChange}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 0,
                    },
                    '& .MuiInputLabel-root': {
                        fontSize: '0.8rem',
                        fontWeight: 'regular',
                    },
                    '& .MuiOutlinedInput-inputMultiline': {
                        height: '1.rem',
                    },
                }}
            />

            <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{
                    width: '100%',
                    mt: '1rem',
                    mb: '1rem',
                }}
                >
                Save
            </Button>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    Your item is successfully saved.
                </Alert>
            </Snackbar>
        </Box>
    )
}