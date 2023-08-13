import React, {useState, useEffect} from 'react'
import { TextField, Box, MenuItem, Select, InputLabel, FormControl, Button, Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';
import CustomDropdown from './CustomDropdown';
import axios from '../config/axiosConfig';
import getCookie from '../utils/utils';
import { FormInput } from './FormInput';
import { FormImageUpload } from './FormImageUpload';
import { SubmitButton } from './SubmitButton';
import { FormSnackbar } from './FormSnackbar';
import { useFetchData } from '../hooks/useFetchData';

export default function PayDetails() {

    const [formData, setFormData] = useState({
        expense_category: "",
        title: "",
        amount: "",
        payment_category: "",
        description: "",
        image: null
    })

    const [expenseCategories, setExpenseCategories] = useState([]);
    const [paymentCategories, setPaymentCategories] = useState([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);


    const [expenseData] = useFetchData('http://localhost:8000/finances/api/v1/expense-category/');
    const [paymentData] = useFetchData('http://localhost:8000/finances/api/v1/payment-category/');
    
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
    
    
     
    
    // console.log("expenseData: ", expenseData)
    // console.log("paymentData: ", paymentData)

    function handleChange(event) {
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value
            }
        })
    }

    function handleSubmit(event) {
        event.preventDefault();
        
        const formDataToSend = new FormData();
        
        // Add all the form data
        for (const key in formData) {
            formDataToSend.append(key, formData[key]);
        }
        
        const token = getCookie('JWT_COOKIE_FAMILY_ACCOUNTING');
    
        // Sending the data to your backend using axios
        axios.post('http://localhost:8000/finances/api/v1/expense-item/', formDataToSend, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            withCredentials: true
        })
        .then(response => {
            if (response.status === 200 || response.status === 201) {
                // Open the Snackbar
                setOpenSnackbar(true);
                // Reset the form data
                setFormData({
                    expense_category: "",
                    title: "",
                    amount: "",
                    payment_category: "",
                    description: "",
                    image: null
                });
            }
        })
        .catch(error => {
            // Handle any errors
            console.error('Error:', error);
        });
    }
    

    function handleImageChange(event) {
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                image: event.target.files[0]
            }
        })
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
            {/* {expenseError && <p>Error loading expense data: {expenseError}</p>}
            {paymentError && <p>Error loading payment data: {paymentError}</p>}
            {isLoadingExpense && <p>Loading expense data...</p>}    
            {isLoadingPayment && <p>Loading payment data...</p>} */}

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