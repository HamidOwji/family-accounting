import { useState } from 'react';
import axios from '../config/axiosConfig';
import getCookie from '../utils/utils';

export default function useSubmitForm(initialState, submitUrl) {
    const [formData, setFormData] = useState(initialState);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    function handleChange(event) {
        setFormData(prevFormData => ({
            ...prevFormData,
            [event.target.name]: event.target.value
        }));
    }

    function handleImageChange(event) {
        setFormData(prevFormData => ({
            ...prevFormData,
            image: event.target.files[0]
        }));
    }

    function handleSubmit(event) {
        event.preventDefault();
        
        const formDataToSend = new FormData();
        for (const key in formData) {
            formDataToSend.append(key, formData[key]);
        }
        
        const token = getCookie('JWT_COOKIE_FAMILY_ACCOUNTING');
    
        axios.post(submitUrl, formDataToSend, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            withCredentials: true
        })
        .then(response => {
            if (response.status === 200 || response.status === 201) {
                setOpenSnackbar(true);
                setFormData(initialState);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    function handleCloseSnackbar(event, reason) {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    }

    return {
        formData,
        setFormData,
        openSnackbar,
        handleChange,
        handleImageChange,
        handleSubmit,
        handleCloseSnackbar
    };
}



