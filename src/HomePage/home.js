import { Box, Card,  styled, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
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
                      {/* <Skeleton height={100} /> */}
                      <Card sx={{height: 100, borderRadius: 2}} elevation={2}>
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


                        </Grid>
                        
                      </Card>
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
                        <Box height={60} />
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