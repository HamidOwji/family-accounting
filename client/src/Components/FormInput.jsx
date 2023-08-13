import { TextField } from '@mui/material';

export function FormInput(props) {
    const { name, label, onChange, value, multiline } = props;

    return (
        <TextField
            name={name}
            label={label}
            variant="outlined"
            fullWidth
            type={multiline ? "text" : "number"}
            value={value}
            onChange={onChange}
            multiline={multiline}
            rows={multiline ? 2 : 1}
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
            }}
        />
    );
}
