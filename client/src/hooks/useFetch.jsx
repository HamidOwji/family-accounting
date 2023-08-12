import { useState, useEffect } from 'react';
import axios from '../config/axiosConfig';
import Cookies from 'js-cookie';

function useFetch(url) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const csrftoken = Cookies.get('csrftoken');
            const jwtToken = Cookies.get('JWT_COOKIE_NAME');

            try {
                const response = await axios.get(url, {
                    headers: {
                        'X-CSRFToken': csrftoken,
                        'Authorization': `Bearer ${jwtToken}`
                    }
                });
                setData(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return { data, loading, error };
}

export default useFetch;


