import { Button } from '@mui/material';

export function SubmitButton(props) {
    return (
        <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{
                width: '100%',
                mt: '1rem',
                mb: '1rem',
            }}
        >
            Save
        </Button>
    );
}
