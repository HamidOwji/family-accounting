import React, {useState, useEffect} from 'react'
import { TextField, Box, MenuItem, Select, InputLabel, FormControl, Button } from '@mui/material';


export default function PayDetails() {

    const [formData, setFormData] = useState({
        expense_category: "",
        title: "",
        amount: "",
        payment_category: "",
        description: "",
        image: null
    })

    const [categories, setCategories] = useState([]);

    // fetch categories from the backend when component mounts
    useEffect(() => {
        fetch('http://localhost:8000/finances/api/v1/expense-category/')
            .then(response => response.json())
            .then(data => {
                setCategories(data);
            // Check if data has at least one element and that the element has a title
            if(data[0] && data[0].title) {
                setFormData(prevFormData => {
                    return {
                        ...prevFormData,
                        expense_category: data[0].title // Set the first category as the default selected value
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
        event.preventDefault()
    }

    function handleImageChange(event) {
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                image: event.target.files[0]
            }
        })
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
                    {categories.map((category, index) => (
                        <MenuItem key={index} value={category.title}>{category.title}</MenuItem>
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
            <TextField
                name="payment_category"
                label="Payment category"
                variant="outlined"
                fullWidth
                value={formData.payment_category}
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
        </Box>

    )
}