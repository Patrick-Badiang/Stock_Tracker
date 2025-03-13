import { Search } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";

import Grid from '@mui/material/Grid2';


export default function SearchBar() {
    return (
        <Grid>
            <TextField height = {60} variant="outlined" fullWidth placeholder = "Search for a stock" 
            slotProps={{
                input:{
                    startAdornment: (
                    <InputAdornment position="start">
                        <Search />
                    </InputAdornment>
                    ),
                }}}
                
                />
        </Grid>
    );
}