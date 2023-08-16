import React from "react";
import { useNavigate } from 'react-router-dom';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import EuroOutlinedIcon from '@mui/icons-material/EuroOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { Box } from '@mui/material';
import { styles } from '../styles/appFrame.styles'
import { Link } from 'react-router-dom'

export default function AppFrame({ children }) {
    const navigate = useNavigate();
    
    function handleLogout() {

        fetch('http://localhost:8000/accounts/api/v1/logout/', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            // body: JSON.stringify({ token: localStorage.getItem('token') })  
        })
            .then(response => {
                if (response.ok) {
                    // Remove the token from local storage.
                    localStorage.removeItem('token');
                    navigate("/login");
                }
            });
    }

    return (
        <Box sx={styles.mainBox } >
            <Box sx={ styles.secondBox } >
                <Box  sx={ styles.thirdBox } >
                    <Box>
                        <LogoutOutlinedIcon sx={ styles.icon } onClick={handleLogout} />
                    </Box>
                </Box>
                {children}
                <Box sx={ styles.centerBox} >
                    <Box>
                        <BarChartOutlinedIcon sx={ styles.icon } />
                    </Box>
                    <Box>
                        <Link to='/categories'>
                            <CategoryOutlinedIcon sx={ styles.icon } />
                        </Link>
                    </Box>
                    <Box>
                        <Link to='/operations'>
                            <EuroOutlinedIcon sx={ styles.icon } />
                        </Link>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
