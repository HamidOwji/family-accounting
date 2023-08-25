import { useState } from 'react';
import axios from '../config/axiosConfig';
import Cookies from 'js-cookie';

const usePostData = (url) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const postData = async (formData) => {
        setIsLoading(true);
        setError(null);
        setData(null);
    
        const csrftoken = Cookies.get('csrftoken');
        let response;
    
        try {
            response = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken
                }
            });
    
            setData(response.data);
            setIsLoading(false);
            return { data: response.data };
        } catch (err) {
            const errorMessage = err.response && err.response.data && err.response.data.error
            ? err.response.data.error
            : err.message;
        
            setError(errorMessage);
            setIsLoading(false);
            return { data: { error: errorMessage } };
        }
    
    };
    
    

    return [postData, isLoading, data, error];
};

export default usePostData;
