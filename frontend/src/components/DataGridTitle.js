import { useState, useImperativeHandle, forwardRef } from 'react';
import { Box, Typography, Grid2 as Grid, TextField, InputAdornment, IconButton } from '@mui/material';
import { Search, Close } from '@mui/icons-material';

function DataGridTitle({ searchText, setSearchText }) {

    const handleChange = (event) => {
        setSearchText(event.target.value); // Atualiza o estado no Parent
      };
    

    console.log(searchText);

    return (
        <Box p={1} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "space-around" }}>
            <Typography mt={2} color="error" variant="h6"><strong>Histórico</strong></Typography>
            <TextField
                value={searchText}
                onChange={(e) => { setSearchText(e.target.value) }}
                slotProps={{
                    input: {
                        startAdornment: <InputAdornment position="start"><Search /></InputAdornment>,
                        endAdornment: <InputAdornment position="end">
                            <IconButton
                                onClick={setSearchText("")}
                            >
                                <Close />
                            </IconButton>
                        </InputAdornment>
                    },
                }}
                width={150} id="standard-basic" variant="standard" />
        </Box>
    )
}
export default DataGridTitle;