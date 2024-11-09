import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useNavigate, useLocation } from 'react-router-dom';
import { Grid2 as Grid, Box } from '@mui/material';

function Menu() {
    const { pathname } = useLocation();
    const [alignment, setAlignment] = React.useState(pathname);
    const navigate = useNavigate();

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
        navigate(newAlignment);
    };

    return (
        <Grid container
            direction="row"
            alignContent="center"
            justifyItems="center"
            justifyContent="center"
            style={{ textAlign: "center" }}
        >
            <Box marginTop={5} height={100} textAlign="center">
                <ToggleButtonGroup
                    color="primary"
                    value={alignment}
                    exclusive
                    onChange={handleChange}
                    aria-label="Platform"
                >
                    <ToggleButton value="/">Busca</ToggleButton>
                    <ToggleButton value="/history">Histórico</ToggleButton>
                </ToggleButtonGroup>
            </Box>
        </Grid>

    )
}
export default Menu;