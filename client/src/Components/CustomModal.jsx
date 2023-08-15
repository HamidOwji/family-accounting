import React from "react";
import { Modal, TextField, Button, useTheme } from "@mui/material";
import getStyles from '../styles/modal'

export default function CustomModal({ open, onClose, titleValue, setTitle, currentRowId, isEditing, setIsEditing, category, refetch }) {
    const theme = useTheme();
    const styles = getStyles(theme)
    
    async function handleAddOrUpdateRow() {
        const url = isEditing
            ? `http://localhost:8000/finances/api/v1/${category}/${currentRowId}/`
            : `http://localhost:8000/finances/api/v1/${category}/`;
        
        const method = isEditing ? 'PUT' : 'POST';
        const data = {
            title: titleValue,
        };

        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            credentials: 'include'
        });

        if(response.ok) {
            refetch();
        }
        setTitle('');
        onClose();
        setIsEditing(false);
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="add-new-item"
            aria-describedby="modal-to-add-new-item"
        >
            <div style={styles.mainDiv}>
                <h2>{isEditing ? 'Edit Item' : `Add New Item to ${category}`}</h2>
                <TextField 
                    label="Title"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={titleValue}
                    onChange={e => setTitle(e.target.value)}
                />
                <Button 
                    variant="contained"
                    color="primary"
                    onClick={handleAddOrUpdateRow}
                >
                    {isEditing ? 'Save' : 'Add'}
                </Button>
            </div>
        </Modal>
    );
}
