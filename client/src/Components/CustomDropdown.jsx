// CustomDropdown.js

import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const CustomDropdown = ({ items, value, onChange, name, label }) => (
    <FormControl fullWidth variant="outlined"
        sx={{
            '& .MuiOutlinedInput-root': {
                borderRadius: 0,
            },
            '& .MuiInputLabel-root': {
                fontSize: '0.8rem',
                fontWeight: 'regular',
            },
            '& .MuiOutlinedInput-input': {
                height: '1rem',
            },
        }}>
        <InputLabel>{label}</InputLabel>
        <Select
            name={name}
            value={value}
            onChange={onChange}
            label={label}
        >
            {items.map((item) => (
                <MenuItem key={item.id} value={item.id}>{item.title}</MenuItem>
            ))}
        </Select>
    </FormControl>
);

export default CustomDropdown;

  