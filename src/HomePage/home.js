import { Box, Button, FormControl, MenuItem, Select, styled } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useState } from 'react';
import ChangePortfolioButton from '../ChangePortfolioButton';

const Skeleton = styled('div')(({ theme, height }) => ({
    backgroundColor: theme.palette.action.hover,
    borderRadius: theme.shape.borderRadius,
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: '1px',
    height,
    content: '" "',
  }));

export default function Home(){

  

    return (
        <Grid container spacing={1}>
            <Grid size={6}>
                <Grid container direction={'column'} spacing={0}>
                    {/* Button Group*/}
                    <ChangePortfolioButton/>
                    <Grid size={12}>
                      <Box height={10} />
                    </Grid>
                    <Grid size={12}>
                      <Skeleton height={100} />
                    </Grid>
                    <Grid size={12}>
                      <Box height={30} />
                    </Grid>
                    <Grid size={12}>
                    <Skeleton height={690} />
                    </Grid>
                </Grid>
            </Grid>
            <Grid size={1}>
                  {/* <Skeleton height={60} /> */}
            </Grid>
            <Grid size={5}>
                <Grid container direction={'column'} spacing={1}>
                    <Grid size={12}>
                        <Box height={40} />
                    </Grid>
                    <Grid size={12}>
                        <Skeleton height={390} />
                    </Grid>
                    <Grid size={12}>
                        <Box height={20} />
                    </Grid>
                    <Grid size={12}>
                        <Skeleton height={390} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}