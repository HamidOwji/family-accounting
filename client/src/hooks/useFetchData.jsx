
import { useState, useEffect } from 'react';
import axios from '../config/axiosConfig';
import getCookie from '../utils/utils';

export function useFetchData(endpoint) {
    const [data, setData] = useState(undefined);
    
    useEffect(() => {
        const token = getCookie('JWT_COOKIE_FAMILY_ACCOUNTING');
        axios.get(endpoint, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            withCredentials: true
        })
        .then(response => {
            setData(response.data);
        });
    }, [endpoint]);

    return [data]; 
}