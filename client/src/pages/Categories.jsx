import React from 'react';
import { Button, Box, Typography } from '@mui/material';
import AppFrame from '../Components/AppFrame';
import { useNavigate } from 'react-router-dom';

export default function Categories() {
    const navigate = useNavigate();

    const handleNavigation = (label) => {
        navigate(`/${label}`);
    }

    return (
        <AppFrame>
            <Box
                display="flex"
                flexDirection="column" // Set to row since you're displaying buttons side by side
                alignItems="center"
                justifyContent="center"
                width="60%" // Matching width with IncomeDetails
                mt={3}
                gap="1.2rem" // Space between the buttons
            >
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

