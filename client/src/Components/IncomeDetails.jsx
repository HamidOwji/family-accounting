import React, { useState, useEffect } from 'react'
import { TextField, Box, MenuItem, Select, InputLabel, FormControl, Button, Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';
import CustomDropdown from './CustomDropdown';
import axios from '../config/axiosConfig';
import getCookie from '../utils/utils';
import { FormInput } from './FormInput';
import { SubmitButton } from './SubmitButton';
import { FormSnackbar } from './FormSnackbar';
import { useFetchData } from '../hooks/useFetchData';

export default function IncomeDetails() {
    const [formData, setFormData] = useState({
        income_category: '',
        amount: '',
        description: '',
    })
    const [incomeCategories, setIncomeCategories] = useState([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const [incomeData] = useFetchData('http://localhost:8000/finances/api/v1/income-category/');

    
    useEffect(() => {
        if (incomeData) {
            setIncomeCategories(incomeData);  
            if(incomeData[0] && incomeData[0].id) {
                setFormData(prevFormData => ({
                    ...prevFormData,
                    income_category: incomeData[0].id
                }));
            }
        }
    
    }, [incomeData]);
    

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
                items={incomeCategories}
                value={formData.income_category}
                onChange={handleChange}
                name="income_category"
                label="Income category"
            />

            <FormInput name="amount"
             label="Amount"
             variant="Outlined"
             value={formData.amount}
             onChange={handleChange} />
            <FormInput name="description"
             label="Description"
             variant="Outlined"
             multiline
             value={formData.description}
             onChange={handleChange} />

            <SubmitButton />
            <FormSnackbar open={openSnackbar}  onClose={handleCloseSnackbar} />
        </Box>
    )
}