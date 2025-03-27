import { Box, Button, FormControl, MenuItem, Select } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState } from "react";
import data from "../FakeData/AvailablePortfolios.json"; 
import { usePortfolio } from "../Context/PortfolioContext"; 

const portfolios = data.portfolios;

export default function ChangePortfolioButton() {
    const { selectedPortfolio, setSelectedPortfolio } = usePortfolio();
    const [localSelection, setLocalSelection] = useState("");
    const { portfolioData } = usePortfolio(); // Access global portfolio data
    


    const handleChange = (event) => {
        const selectedName = event.target.value;
        const portfolio = portfolios.find((p) => p.name === selectedName);
        setLocalSelection(selectedName);
        setSelectedPortfolio(portfolio || null);
    };

    return (
        <Grid container size={12}>
            {/* <Skeleton height={40} /> */}
            <Grid size={6}>
                <Box height={50} sx = {{display: 'flex', justifyContent: 'start'}}>
                    <FormControl sx={{ width: "100%", height: 40, textAlign: "left" }}>
                        <Select value={portfolioData?.name?.toString() || ""} onChange={handleChange} displayEmpty>
                            <MenuItem value="">
                                <em>Select Portfolio</em>
                            </MenuItem>
                            {portfolios.map((portfolio) => (
                                <MenuItem key={portfolio.name} value={portfolio.name}>
                                    {portfolio.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
            </Grid>
            <Grid size={3} alignContent={'flex-end'}>

                <Button variant="contained" color="transparent" sx = {{height: 40, width: '90%'}}>Add a Position</Button>
            </Grid>
            <Grid size={3} alignContent={'flex-end'}>
                <Button variant="contained" color="transparent" sx = {{height: 40, width: '90%'}}>Edit Watchlist</Button>
            </Grid>
            <Grid size={12}>
                      <Box height={10} />
            </Grid>
        </Grid>
    )
}