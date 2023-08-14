import React, { useState } from "react";
import { 
    Table, TableBody, TableCell, TableContainer, TableRow, 
    Paper, IconButton
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import useFetch from '../hooks/useFetch';
import CustomModal from './CustomModal';

export default function CustomTable({ category }) {
    const { data: rows, loading, error, refetch } = useFetch(`http://localhost:8000/finances/api/v1/${category}/`);
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [currentRowId, setCurrentRowId] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    async function handleDeleteRow(id) {
        const response = await fetch(`http://localhost:8000/finances/api/v1/${category}/${id}/`, {
            method: 'DELETE',
            credentials: 'include'
        });
        
        if(response.ok) {
            refetch();
        }
    };

    function handleModifyRow(id) {
        const rowToEdit = rows.find(row => row.id === id);
        setTitle(rowToEdit.title);
        setCurrentRowId(id);
        setIsEditing(true);
        setOpen(true);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <TableContainer component={Paper}>
                <Table>
                    <TableBody>
                        {rows.map(row => (
                            <TableRow key={row.id}>
                                <TableCell>{row.title}</TableCell>
                                <TableCell align="right">
                                    <IconButton onClick={() => handleModifyRow(row.id)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDeleteRow(row.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <IconButton onClick={() => setOpen(true)} style={{ marginTop: '16px' }}>
                <AddCircleIcon />
            </IconButton>
            <CustomModal
                open={open}
                onClose={() => setOpen(false)}
                titleValue={title}
                setTitle={setTitle}
                currentRowId={currentRowId}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                category={category}
                refetch={refetch}
            />
        </div>
    );
}
