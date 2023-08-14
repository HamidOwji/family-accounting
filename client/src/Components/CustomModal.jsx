import React from "react";
import { Modal, TextField, Button, useTheme } from "@mui/material";

export default function CustomModal({ open, onClose, titleValue, setTitle, currentRowId, isEditing, setIsEditing, category, refetch }) {
    const theme = useTheme();

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
            <div style={{
                top: `50%`,
                left: `50%`,
                transform: `translate(-50%, -50%)`,
                position: 'absolute',
                width: '50%',
                backgroundColor: theme.palette.background.white,
                border: theme.palette.primary.main,
                boxShadow: 24,
                padding: 15,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
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
