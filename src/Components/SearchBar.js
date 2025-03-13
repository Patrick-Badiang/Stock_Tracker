import { Search } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";

import Grid from '@mui/material/Grid2';
import { useState } from "react";


export default function SearchBar({onSearch}) {

    const [onQuery, onQueryChange] = useState("");

    const handleSearch = (e) => {
        if (e.key === "Enter" && onQuery.trim() !== "") {
            onSearch(onQuery);
        }
    }

    return (
        <Grid>
            <TextField 
                height = {60} 
                variant="outlined" 
                fullWidth 
                placeholder = "Search for a stock" 
                slotProps={{
                    input:{
                        startAdornment: (
                        <InputAdornment position="start">
                            <Search />
                        </InputAdornment>
                        ),
                    }}}
                value = {onQuery}
                onChange = {(e) => onQueryChange(e.target.value)}
                onKeyDown = {handleSearch}
                />
        </Grid>
    );
}