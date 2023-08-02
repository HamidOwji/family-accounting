import { useState } from 'react';
import axios from 'axios';
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

        try {
            const response = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken
                }
            });

            setData(response.data);
            setIsLoading(false);
        } catch (err) {
            setError(err.message);
            setIsLoading(false);
        }
    };

    return [postData, isLoading, data, error];
};

export default usePostData;