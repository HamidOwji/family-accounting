import React, { useState } from "react";
import { 
    Table, TableBody, TableCell, TableContainer, TableRow, 
    Paper, IconButton, Icon 
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';


export default function CustomTable() {
    const [rows, setRows] = useState([
        { id: 1, title: "Title 1" },
        { id: 2, title: "Title 2" },
        // ... add more initial data as needed
    ]);

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

