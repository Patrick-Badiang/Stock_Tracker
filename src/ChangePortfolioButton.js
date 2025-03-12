import { Box, Button, FormControl, MenuItem, Select } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useState } from 'react';


export default function ChangePortfolioButton() {
    const [age, setAge] = useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };
    return (
        <Grid container size={12}>
            {/* <Skeleton height={40} /> */}
            <Grid size={6}>
                <Box height={50} sx = {{display: 'flex', justifyContent: 'start'}}>
                <FormControl sx={{ width: '100%', height: 40 }}>
                    <Select
                        value={age}
                        onChange={handleChange}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                        <MenuItem value="">
                            <em>Select Portfolio</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
                </Box>
            </Grid>
            <Grid size={3}>
                <Button variant="contained" color="transparent" sx = {{height: 40, width: '90%'}}>Add New Position</Button>
            </Grid>
            <Grid size={3}>
                <Button variant="contained" color="transparent" sx = {{height: 40, width: '90%'}}>Edit Watchlist</Button>
            </Grid>
        </Grid>
    )
}