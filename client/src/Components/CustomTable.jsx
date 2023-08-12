import React, { useState } from "react";
import { 
    Table, TableBody, TableCell, TableContainer, TableRow, 
    Paper, IconButton, Icon 
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import useFetch from '../hooks/useFetch';


export default function CustomTable() {
    const { data: rows, loading, error } = useFetch('http://localhost:8000/finances/api/v1/expense-category/');


    const handleAddRow = () => {
        // Logic to add a row (for simplicity, adding a dummy title here)
        const newRow = {
            id: rows.length + 1,
            title: `Title ${rows.length + 1}`,
        };
        setRows([...rows, newRow]);
    };

    const handleDeleteRow = (id) => {
        // Logic to delete a row by id
        const updatedRows = rows.filter(row => row.id !== id);
        setRows(updatedRows);
    };

    const handleModifyRow = (id) => {
        // Logic to modify a row (for simplicity, appending ' (Modified)' to title)
        const updatedRows = rows.map(row => 
            row.id === id ? { ...row, title: row.title + " (Modified)" } : row
        );
        setRows(updatedRows);
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
            <IconButton onClick={handleAddRow} style={{ marginTop: '16px' }}>
                <AddCircleIcon />
            </IconButton>
        </div>
    );
}

