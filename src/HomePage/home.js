import { Box, Card, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import ChangePortfolioButton from '../Components/ChangePortfolioButton';
import NewsFeed from '../Components/NewsFeed';
import StockChart from '../Components/StockChat';
import StockWatcher from './StockWatcher';
import PortfolioValues from '../Components/PortfolioValues';
import { Link } from 'react-router-dom';


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
                        {/* Portfolio Value */}
                        <Link to="/positions" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Card sx={{height: 100, borderRadius: 2}} elevation={2}>
                            <PortfolioValues/>
                        </Card>
                        </Link>
                    </Grid>


                    <Grid size={12}>
                      <Box height={30} />
                    </Grid>


                    <Grid size={12}>
                        {/* News*/}
                        <Card sx={{height: 690, borderRadius: 2}} elevation={2}>
                          <Grid container size={12}>
                            <Grid size={12}>
                              <Typography variant='h5'>News</Typography>
                            </Grid>
                            <Grid size={12}>
                              <NewsFeed/>
                            </Grid>
                          </Grid>
                        </Card>
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
                        <Box height={390}>
                          <StockWatcher/>
                        </Box>
                    </Grid>
                    <Grid size={12}>
                        <Box height={20} />
                    </Grid>
                    <Grid size={12}>
                        <StockChart/>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}