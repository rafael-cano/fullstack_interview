import React from "react";
import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Box, Typography, Grid2 as Grid, TextField, InputAdornment, IconButton } from '@mui/material';
import { Search, Close } from '@mui/icons-material';
import { getHistory } from '../services/apiRequest';
import Alert from '@mui/material/Alert';

function HistoryPage() {

    const [searchText, setSearchText] = useState('');

    const columns = [
        { field: 'user', headerName: 'Nome', flex: 1 },
        { field: 'movieName', headerName: 'Filme', flex: 1 },
        {
            field: 'result',
            headerName: 'Duração do Filme',
            flex: 1,
            valueGetter: (params) => params ? params?.runtimeInMinutes : '',
        },
        {
            field: 'timestamp',
            headerName: 'JData / Hora da Consulta',
            flex: 1,
            valueFormatter: params =>
                params.toString().substring(0, 10),
        },
    ];


    const [rows, setRows] = useState([]);
    const [filteredRows, setFilteredRows] = useState(rows);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getHistory();
            setRows(data);
            setSearchText('');
            setFilteredRows(data);
            return data;
        }
        fetchData().catch(console.error);
    }, []);

    useEffect(() => {
        setFilteredRows(filterRows(searchText));
    }, [searchText]);

    const filterRows = (filter) => {
        if (!filter || filter == '') return rows;
        return rows.filter(x => (
            matchFilter(x.user, filter) ||
            matchFilter(x.movieName, filter) ||
            matchFilter(x.result?.runtimeInMinutes, filter) ||
            matchFilter(x.timestamp, filter))
        )
    };

    const matchFilter = (field, value) => {
        const fieldValue = field ? field.toString() : '';
        if (fieldValue.toLowerCase().includes(value.toLowerCase())) {
            return true;
        }
        return false;
    };

    const paginationModel = { page: 0, pageSize: 5 };

    console.log(searchText);

    return (
        <>
            <Grid
                container direction="column"
                alignContent="center"
                justifyItems="center"
                justifyContent="center"
                spacing={2}
                sx={{ minHeight: '100vh', textAlign: "center" }}
            >
                <Box
                    sx={{ width: { xs: '100%', md: '1000px' }, backgroundColor: '#fff' }}
                >
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
                                            onClick={() => setSearchText("")}
                                        >
                                            <Close />
                                        </IconButton>
                                    </InputAdornment>
                                },
                            }}
                            width={150} id="standard-basic" variant="standard" />
                    </Box>
                    <Paper sx={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={filteredRows}
                            columns={columns}
                            initialState={{ pagination: { paginationModel } }}
                            pageSizeOptions={[5, 10]}
                            sx={{ border: 0 }}
                        />
                    </Paper>
                </Box>
                <Alert marginTop="150px" severity="info" >
                                    Campo Ano do Filme proposto foi trocado por Duracao do Filme pois o campo Ano não existe mais nos resultados da API https://the-one-api.dev
                </Alert>
            </Grid>
        </>
    );
}

export default HistoryPage;