import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Grid2 as Grid, Box } from '@mui/material';
import { searchMovie } from "../services/apiRequest";
import Alert from '@mui/material/Alert';


function SearchPage() {

    const [resultMovie, setResultMovie] = useState('');
    const [resultDuration, setResultDuration] = useState('');
    const [user, setUser] = useState('');
    const [movieName, setMovieName] = useState('');
    const [notFoundAlert, setNotFoundAlert] = useState(false);
    const [notTyped, setNotTyped] = useState(false);


    const handleSearchClick = () => {
        if (user == '' || movieName == '') {
            setNotTyped(true);
            return;
        }
        const fetchData = async () => {
            const data = await searchMovie(movieName, user);
            if (data && data.name && data.name != '') {
                setResultMovie(data.name);
                setResultDuration(data.runtimeInMinutes);
                setNotFoundAlert(false);
                setNotTyped(false);
            } else {
                setNotFoundAlert(true);
                cleanResults();
                setNotTyped(false);
            }
            cleanTextFields();
        }
        fetchData().catch(console.error);
    };

    const cleanResults = () => {
        setResultMovie('');
        setResultDuration('');
    };

    const cleanTextFields = () => {
        setUser('');
        setMovieName('');
    };

    const handleCloseNotFound = () => {
        setNotFoundAlert(false);
    };

    const handleCloseNotTyped = () => {
        setNotTyped(false);
    };


    return (
        <div>
            <Grid
                container direction="column"
                alignContent="center"
                justifyItems="center"
                justifyContent="center"
                spacing={2}
                style={{ minHeight: '400px', textAlign: "center" }}
            >
                <Grid size={12}>
                    <TextField
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                        placeholder="Digite seu nome"
                    />
                </Grid>
                <Grid size={12}>
                    <TextField
                        value={movieName}
                        onChange={(e) => setMovieName(e.target.value)}
                        placeholder="Digite o nome do Filme"
                    />
                </Grid>
                <Grid size={12}>
                    <Button onClick={handleSearchClick} color="success" variant="contained">Buscar</Button>
                </Grid>
                <Grid size={12}>
                    <Grid container
                        direction="row"
                        alignContent="center"
                        justifyItems="center"
                        justifyContent="center"
                        marginTop={5}
                        style={{ textAlign: "center" }}
                    >
                        {(resultMovie && resultDuration & !notTyped) ?
                            (<>
                                <Grid marginBottom={4} size={{ xs: 12, md: 3 }}><label>Filme: {resultMovie}</label></Grid>
                                <Grid marginBottom={4} size={{ xs: 12, md: 3 }}><label>Duração: {resultDuration}</label></Grid>
                            </>
                            )
                            : (<></>)}
                        {
                            notFoundAlert ? (
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Box marginTop="10px" marginBottom="10px">
                                        <Alert severity="info" onClose={handleCloseNotFound}>
                                            Filme não encontrado!
                                        </Alert>
                                    </Box>
                                </Grid>
                            ) : (<></>)
                        }
                        {
                            notTyped ? (
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Box marginTop="10px" marginBottom="10px">
                                        <Alert severity="warning" onClose={handleCloseNotTyped}>
                                            Dados não digitados corretamente!
                                        </Alert>
                                    </Box>
                                </Grid>
                            ) : (<></>)
                        }
                        <Grid size={{ xs: 12, md: 8 }}>
                            <Box marginTop="40px">
                                <Alert severity="info">
                                    Campo Ano do Filme proposto foi trocado por Duracao do Filme pois o campo Ano não existe mais nos resultados da API https://the-one-api.dev
                                </Alert>
                            </Box>
                        </Grid>
                    </Grid>

                </Grid>
            </Grid>
        </div>
    );
}

export default SearchPage;