import React, { useState } from "react";
import { Button,  MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import AppFrame from "../Components/AppFrame";
import PayDetails from "../Components/PayDetails";
import IncomeDetails from "../Components/IncomeDetails";
import { styles } from '../styles/operation.styles'

export default function Operations() {

    const [financialDetail, setFinancialDetail] = useState(''); // State for financial detail selection

    function handleFinancialDetailChange(event) {
        setFinancialDetail(event.target.value);
    }

    return (
        <AppFrame>
            <FormControl fullWidth variant="outlined"
                sx={styles.formStyle}>
                <InputLabel>Financial Detail</InputLabel>
                <Select
                    value={financialDetail}
                    onChange={handleFinancialDetailChange}
                    label="Financial Detail"
                >
                    <MenuItem value="pay_details">Pay Detail</MenuItem>
                    <MenuItem value="income_details">Income Detail</MenuItem>
                </Select>
            </FormControl>

            {financialDetail === 'pay_details' && <PayDetails />}
            {financialDetail === 'income_details' && <IncomeDetails />}

        </AppFrame>
    )
}
