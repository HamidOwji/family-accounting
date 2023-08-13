import React, { useState, useEffect } from 'react'
import {  Box } from '@mui/material';
import CustomDropdown from './CustomDropdown';
import { FormInput } from './FormInput';
import { SubmitButton } from './SubmitButton';
import { FormSnackbar } from './FormSnackbar';
import { useFetchData } from '../hooks/useFetchData';
import useSubmitForm from '../hooks/useSubmitForm'; 


export default function IncomeDetails() {
    const initialState = {
        income_category: '',
        amount: '',
        description: '',
    };
    
    const submitUrl = 'http://localhost:8000/finances/api/v1/income-item/';
    
    const {
        formData,
        setFormData,
        openSnackbar,
        handleChange,
        handleSubmit, 
        handleCloseSnackbar
    } = useSubmitForm(initialState, submitUrl);
    
    const [incomeCategories, setIncomeCategories] = useState([]);

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