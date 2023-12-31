import React, {useState, useEffect} from 'react'
import {  Box } from '@mui/material';
import CustomDropdown from './CustomDropdown';
import { FormInput } from './FormInput';
import { FormImageUpload } from './FormImageUpload';
import { SubmitButton } from './SubmitButton';
import { FormSnackbar } from './FormSnackbar';
import useFetch from '../hooks/useFetch';
import useSubmitForm from '../hooks/useSubmitForm';
import { styles } from '../styles/incomeAndPayDetails.styles'

export default function PayDetails() {
    const initialState = {
        expense_category: "",
        title: "",
        amount: "",
        payment_category: "",
        description: "",
        image: null
    };

    const submitUrl = 'http://localhost:8000/finances/api/v1/expense-item/';

    const {
        formData,
        setFormData,
        openSnackbar,
        handleChange,
        handleImageChange,
        handleSubmit,
        handleCloseSnackbar
    } = useSubmitForm(initialState, submitUrl);


    const [expenseCategories, setExpenseCategories] = useState([]);
    const [paymentCategories, setPaymentCategories] = useState([]);



    const expenseDataResponse = useFetch('http://localhost:8000/finances/api/v1/expense-category/');
    const paymentDataResponse = useFetch('http://localhost:8000/finances/api/v1/payment-category/');
    
    const expenseData = expenseDataResponse.data;
    const paymentData = paymentDataResponse.data;
    

    useEffect(() => {
        if (expenseData) {
            setExpenseCategories(expenseData);  
            if(expenseData[0] && expenseData[0].id) {
                setFormData(prevFormData => ({
                    ...prevFormData,
                    expense_category: expenseData[0].id
                }));
            }
        }
    
        if (paymentData) {
            setPaymentCategories(paymentData);
            if(paymentData[0] && paymentData[0].id) {
                setFormData(prevFormData => ({
                    ...prevFormData,
                    payment_category: paymentData[0].id
                }));
            }
        }
    }, [expenseData, paymentData]);

    if (expenseDataResponse.loading || paymentDataResponse.loading) {
        return <div>Loading...</div>;
    }
    
    if (expenseDataResponse.error || paymentDataResponse.error) {
        return <div>Error occurred!</div>;
    }
  
    return (

        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={styles.mainBox}
        >

            <CustomDropdown
                items={expenseCategories}
                value={formData.expense_category}
                onChange={handleChange}
                name="expense_category"
                label="Expense category"
            />
            <FormInput name="title"
             label="Title"
             variant="Outlined"
             multiline
             value={formData.title}
             onChange={handleChange} />

            <FormInput name="amount"
             label="Amount"
             variant="Outlined"
             value={formData.amount}
             onChange={handleChange} />

            <CustomDropdown
                items={paymentCategories}
                value={formData.payment_category}
                onChange={handleChange}
                name="payment_category"
                label="Payment category"
            />

            <FormInput name="description"
             label="Description"
             variant="Outlined"
             multiline
             value={formData.description}
             onChange={handleChange} />

            <FormImageUpload onChange={handleImageChange}
             value={formData.image} />
            <SubmitButton />
            <FormSnackbar open={openSnackbar}  onClose={handleCloseSnackbar}/>
        </Box>
        

    )
}