import {  Box, InputLabel } from '@mui/material';
import { styles } from '../styles/formImage.styles'

export function FormImageUpload(props) {
    const { onChange, value } = props;

    return (
        <Box sx={styles.mainBox} >
            <InputLabel htmlFor="upload-photo">Upload Image</InputLabel>
            <Box component="span" sx={styles.secondBox} >
                <input
                    id="upload-photo"
                    name="image"
                    type="file"
                    onChange={onChange}
                    sx={styles.inputStyle}
                />
                {value && <span>{value.name}</span>}
            </Box>
        </Box>
    );
}
