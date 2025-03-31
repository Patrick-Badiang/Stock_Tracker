import { ArrowDropDown } from "@mui/icons-material";
import { Box, Icon, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { usePortfolio } from "../Context/PortfolioContext"; 


export default function PortfolioValues() {
    const { portfolioData } = usePortfolio(); // Access global portfolio data

    if (!portfolioData) {
        return (
        <Box sx={{ height: 65, width: '100%' }}>
            <Typography align="center">Select a portfolio to view details</Typography>
        </Box>);
    }

    return (
        
            <Grid container size={12} m={1}>
                <Grid size={4} direction={'column'} ml={2}>
                    <Typography align='start'>Portfolio Value</Typography>
                    <Typography align='start' variant='h4'>
                        ${portfolioData.value.toLocaleString()}
                    </Typography>
                </Grid>
                <Grid size={3}>
                    <Typography align='start'>Dividends</Typography>
                    <Typography align='start' variant='body1'>
                        ${portfolioData.dividends.toLocaleString()}
                    </Typography>

                </Grid>
                <Grid size={3}>
                    <Typography align='start'>Total Gains/Loss</Typography>
                    <Typography align='start' variant='body1'>
                        ${portfolioData.changeInValue.toLocaleString()}
                    </Typography>

                </Grid>
                <Grid size={1} alignContent={'flex-end'}>
                    <Icon>
                        <ArrowDropDown />
                    </Icon>
                </Grid>
            </Grid>
    );
}
