import React from "react";
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import EuroOutlinedIcon from '@mui/icons-material/EuroOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { Box } from '@mui/material';
import { styles } from '../styles/appFrame.styles'

export default function AppFrame({ children }) {
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
                    // Redirect the user or update the app state as needed.
                    window.location.href = "/login";
                }
            });
    }
    function handleRedirectToOperations() {
        window.location.href = "/operations";
    }
    function handleRedirectToCategories() {
        window.location.href = "/categories";
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
                        <CategoryOutlinedIcon sx={ styles.icon } onClick={handleRedirectToCategories} />
                    </Box>
                    <Box>
                        <EuroOutlinedIcon sx={ styles.icon } onClick={handleRedirectToOperations} />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
