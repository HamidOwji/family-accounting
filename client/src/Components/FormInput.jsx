import { TextField } from '@mui/material';
import { styles } from '../styles/formImage.styles';

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
            sx={styles.TextField}
        />
    );
}
