import {  Box, InputLabel } from '@mui/material';

export function FormImageUpload(props) {
    const { onChange, value } = props;

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem'
            }}
        >
            <InputLabel htmlFor="upload-photo">Upload Image</InputLabel>
            <Box
                component="span"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                }}
            >
                <input
                    id="upload-photo"
                    name="image"
                    type="file"
                    onChange={onChange}
                    sx={{
                        display: 'none',
                        mb: '1rem',
                    }}
                />
                {value && <span>{value.name}</span>}
            </Box>
        </Box>
    );
}
