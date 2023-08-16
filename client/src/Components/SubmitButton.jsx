import { Button } from '@mui/material';
import { styles } from '../styles/submitButton.styles'

export function SubmitButton(props) {
    return (
        <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={styles.button}
        >
            Save
        </Button>
    );
}
 