import {Alert, Snackbar} from '@mui/material'

export function FormSnackbar(props) {
    const { open, onClose } = props;

    return (
        <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={onClose}
        >
            <Alert onClose={onClose} severity="success" sx={{ width: '100%' }}>
                Your item is successfully saved.
            </Alert>
        </Snackbar>
    );
}
