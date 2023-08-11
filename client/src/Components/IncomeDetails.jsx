import React, { useState, useEffect } from 'react'
import { TextField, Box, MenuItem, Select, InputLabel, FormControl, Button } from '@mui/material';
import CustomDropdown from './CustomDropdown';

export default function IncomeDetails() {
    const [formData, setFormData] = useState({
        income_category: '',
        amount: '',
    })
    const [categories, setCategories] = useState([]);

    // fetch categories from the backend when component mounts
    useEffect(() => {
        const token = localStorage.getItem('token');
        const headers = {
            Authorization: `Bearer ${token}`
        };
        fetch('http://localhost:8000/finances/api/v1/income-category/', { headers })
            .then(response => response.json())
            .then(data => {
                setCategories(data);
                if(data[0] && data[0].title) {
                    setFormData(prevFormData => {
                        return {
                            ...prevFormData,
                            income_category: data[0].title // Set the first category as the default selected value
                        }
                    })
                }
            })

    }, [])

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
        event.preventDefault()
        
    }

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
        </Box>
    )
}