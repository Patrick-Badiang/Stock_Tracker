import { ArrowDropDown } from "@mui/icons-material";
import {  Icon, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

export default function PortfolioValues() {



    return (
        
            <Grid container size={12}>
                <Grid size={4} direction={'column'} ml={2}>
                    <Typography align='start'>Portfolio Value</Typography>
                    <Typography align='start' variant='h4'>$150,000</Typography>
                </Grid>
                <Grid size={3}>
                    <Typography align='start'>Dividends</Typography>
                    <Typography align='start' variant='body1'>$1,500</Typography>

                </Grid>
                <Grid size={3}>
                    <Typography align='start'>Total Gains/Loss</Typography>
                    <Typography align='start' variant='body1'>$150,000</Typography>

                </Grid>
                <Grid size={1} alignContent={'flex-end'}>
                <Icon>
                    <ArrowDropDown />
                </Icon>
                </Grid>
            </Grid>
    )
}