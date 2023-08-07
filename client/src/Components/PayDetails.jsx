import React, {useState, useEffect} from 'react'
import { TextField, Box, MenuItem, Select, InputLabel, FormControl, Button, Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';

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

    // fetch expenseCategories from the backend when component mounts
    useEffect(() => {
        const token = localStorage.getItem('token');
        const headers = {
            Authorization: `Bearer ${token}`
        };
        fetch('http://localhost:8000/finances/api/v1/expense-category/', { headers })
            .then(response => response.json())
            .then(data => {
                setExpenseCategories(data);
            // Check if data has at least one element and that the element has a title
            // console.log(data);
            if(data[0] && data[0].title) {
                setFormData(prevFormData => {
                    return {
                        ...prevFormData,
                        expense_category: data[0] && data[0].id ? data[0].id : "", // Set the first category as the default selected value
                    }
                })
            }
        });

        fetch('http://localhost:8000/finances/api/v1/payment-category/', { headers })
            .then(response => response.json())
            .then(data => {
                setPaymentCategories(data);
            // Check if data has at least one element and that the element has a title
            if(data[0] && data[0].title) {
                setFormData(prevFormData => {
                    return {
                        ...prevFormData,
                        payment_category: data[0] && data[0].id ? data[0].id : "" // Set the first category as the default selected value
                    }
                })
            }
        });       
    }, [])


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

            <FormControl fullWidth variant="outlined"
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
                }}>
                <InputLabel>Expense category</InputLabel>
                <Select
                    name="expense_category"
                    value={formData.expense_category}
                    onChange={handleChange}
                    label="Expense category"

                >
                    {expenseCategories.map((category, index) => (
                        <MenuItem key={index} value={category.id}>{category.title}</MenuItem>
                    ))}
                </Select>
            </FormControl>

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
            <FormControl fullWidth variant="outlined"
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
                }}>
                <InputLabel>Payment category</InputLabel>
                <Select
                    name="payment_category"
                    value={formData.payment_category}
                    onChange={handleChange}
                    label="Payment category"

                >
                    {paymentCategories.map((category, index) => (
                        <MenuItem key={index} value={category.id}>{category.title}</MenuItem>
                    ))}
                </Select>
            </FormControl>

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