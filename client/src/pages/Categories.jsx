import React from 'react';
import { Button, Box, Typography } from '@mui/material';
import AppFrame from '../Components/AppFrame';

export default function Categories() {
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
                {['Income', 'Payment', 'Expense'].map((label, index) => (
                    <Button 
                        key={index} 
                        variant="outlined" 
                        color="secondary" 
                        size="large"
                        fullWidth={true}
                    >
                        {label}
                    </Button>
                ))}
            </Box>
        </AppFrame>
    );
}
