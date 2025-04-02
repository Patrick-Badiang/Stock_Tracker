import Grid  from "@mui/material/Grid2";
import { Typography } from "@mui/material";


export default function FundamentalText({ label, value }) {
    return (
        <Grid container size={12} justifyContent={'space-between'}>
            <span>
                <Typography variant={'body1'} align='start' mt={2} fontWeight={'bold'}>
                {label}:  </Typography>
            </span>
            <span>
                <Typography variant={'body1'} align='end' mt={2}>
                {value}</Typography>
            </span>
        </Grid>);
}