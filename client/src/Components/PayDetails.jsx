import React, {useState, useEffect} from 'react'
import { TextField, Box, MenuItem, Select, InputLabel, FormControl, Button, Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';
import CustomDropdown from './CustomDropdown';
import axios from '../config/axiosConfig';

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

    // helper function for axios
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }
    
    useEffect(() => {
        const token = getCookie('JWT_COOKIE_FAMILY_ACCOUNTING');
        axios.get('http://localhost:8000/finances/api/v1/expense-category/', {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            withCredentials: true  // to ensure cookies are sent with the request
        })
        .then(response => {
            setExpenseCategories(response.data);
            if(response.data[0] && response.data[0].id) {
                setFormData(prevFormData => ({
                    ...prevFormData,
                    expense_category: response.data[0].id
                }));
            }
        });
 
        axios.get('http://localhost:8000/finances/api/v1/payment-category/', {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            withCredentials: true  // to ensure cookies are sent with the request
        })
        .then(response => {
            setPaymentCategories(response.data);
            if(response.data[0] && response.data[0].id) {
                setFormData(prevFormData => ({
                    ...prevFormData,
                    payment_category: response.data[0].id
                }));
            }
        }); 
    }, []);


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
    
        // Sending the data to your backend
        fetch('http://localhost:8000/finances/api/v1/expense-item/', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                
            },
            body: formDataToSend
        })
        .then(response => {
            if (response.ok) {
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
            return response.json();
        })
        .then(data => {
            // Handle the response from the backend
            // console.log(data);
            
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

            <CustomDropdown
                items={expenseCategories}
                value={formData.expense_category}
                onChange={handleChange}
                name="expense_category"
                label="Expense category"
            />

            <TextField
                name="title"
                label="Title"
                variant="outlined"
                fullWidth
                value={formData.title}
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
            <CustomDropdown
                items={paymentCategories}
                value={formData.payment_category}
                onChange={handleChange}
                name="payment_category"
                label="Payment category"
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

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1rem'
                }}
            >
                <InputLabel htmlFor="upload-photo">Upload Image</InputLabel>
                <Box
                    component="span"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem'
                    }}
                >
                    <input
                        id="upload-photo"
                        name="image"
                        type="file"
                        onChange={handleImageChange}
                        sx={{
                            display: 'none',
                            mb: '1rem',
                        }}
                    />
                    {formData.image && <span>{formData.image.name}</span>}
                </Box>
            </Box>
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