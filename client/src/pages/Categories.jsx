import React from 'react';
import { Button, Box, Typography } from '@mui/material';
import AppFrame from '../Components/AppFrame';
import { useNavigate } from 'react-router-dom';
import { styles } from '../styles/categories.styles'

export default function Categories() {
    const navigate = useNavigate();

    const handleNavigation = (label) => {
        navigate(`/${label}`);
    }

    return (
        <AppFrame>
            <Box sx={styles.mainBox} >
                <Typography variant="h4" component="h1" gutterBottom>
                    Define categories!
                </Typography>
                {['incomes', 'payments', 'expenses'].map((label, index) => (
                <Button 
                    key={index} 
                    variant="outlined" 
                    color="secondary" 
                    size="large"
                    fullWidth={true}
                    onClick={() => handleNavigation(label)}
                >
                    {label}
                </Button>
            ))}
            </Box>
        </AppFrame>
    );
}

