import { Box, styled, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import SearchBar from '../Components/SearchBar';
import StockChart from '../Components/StockChat';

import stockData from '../FakeData/CompanyOverview.json';

const Skeleton = styled('div')(({ theme, height }) => ({
    backgroundColor: theme.palette.action.hover,
    borderRadius: theme.shape.borderRadius,
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: '1px',
    height,
    content: '" "',
  }));

export default function home(){

    const handleSearch = (value) => { //Take the value and call stock data API 
        console.log("Search Value: ", value);
    }

    return (
    <Grid container spacing={1} alignContent={'center'}>
            <Grid size={5} />
            <Grid size={12}>
                <SearchBar onSearch={handleSearch}/>
            </Grid>
            <Grid size={12}>
                <Box height={40} />
            </Grid>
            <Grid size={4} offset={{ md: 3.7 }}>
                {/* <Skeleton height={100} /> */}
                <Box height={100} sx = {{textAlign: 'center'}}>
                    <Typography variant={'h4'}>{stockData.Symbol}</Typography>
                    <Typography variant={'body1'}>({stockData.Name})</Typography>
                    <Typography variant={'h4'}>$236.00</Typography>
                    <Typography variant={'body1'}>0.00%</Typography>
                </Box>
            </Grid>
            

            <Grid size={12} mt={4} >
                {/* Stock Graph and other Values*/}
                <Grid container spacing={3}  offset={{ md: 1.3 }}>
                    <Grid size={5}>
                        <StockChart />
                    </Grid>
                    <Grid size={5} mt = {8}>
                        
                        {/* <Box height={300} sx={{borderRadius: 2, borderColor: 'black', borderStyle: 'solid', borderWidth: '1px'}}> */}
                            <Grid container spacing={1} size={12} direction={'row'}>
                                <Grid container size={6} direction={'column'} spacing={1}>
                                    <Grid size={12}>
                                        <Typography variant={'body1'} align='start' mt={2}>
                                        Market Cap: ${stockData.MarketCapitalization}</Typography>
                                    </Grid>
                                    <Grid size={12}>
                                        <Typography variant={'body1'} align='start' mt={2}>
                                        Forward PE Ratio: {stockData.ForwardPE}</Typography>
                                    </Grid>
                                    <Grid size={12}>
                                        <Typography variant={'body1'} align='start' mt={2}>
                                        Dividend Yield: {stockData.DividendYield}</Typography>
                                    </Grid>
                                    <Grid size={12}>
                                        <Typography variant={'body1'} align='start' mt={2}>
                                        EBITDA: {stockData.EBITDA}</Typography>
                                    </Grid>
                                    <Grid size={12}>
                                        <Typography variant={'body1'} align='start' mt={2}>
                                        Dividend per Share: {stockData.DividendPerShare}</Typography>
                                    </Grid>

                                </Grid>
                                <Grid container size={6} direction={'column'} spacing={1}>
                                    <Grid size={12}>
                                        <Typography variant={'body1'} align='start' mt={2}>
                                        Revenue TTM: {stockData.RevenuePerShareTTM}</Typography>
                                    </Grid>
                                    <Grid size={12}>
                                        <Typography variant={'body1'} align='start' mt={2}>
                                        Profit Margin: {stockData.ProfitMargin}</Typography>
                                    </Grid>
                                    <Grid size={12}>
                                        <Typography variant={'body1'} align='start' mt={2}>
                                        50 Day MA : ${stockData["50DayMovingAverage"]}</Typography>
                                    </Grid>
                                    <Grid size={12}>
                                        <Typography variant={'body1'} align='start' mt={2}>
                                        52 Week High/Low: ${stockData["52WeekHigh"]}/${stockData["52WeekLow"]}</Typography>
                                    </Grid>
                                    <Grid size={12}>
                                        <Typography variant={'body1'} align='start' mt={2}>
                                        Shares Outstanding: {stockData.SharesOutstanding}</Typography>
                                    </Grid>

                                </Grid>

                            
                            
                           
                            
                            </Grid>
                        {/* </Box> */}
                    </Grid>
                </Grid>
               
                
                
                
            </Grid>

            {/* Fundamental Data*/}
            <Grid size={12} mt={4}>
                <Grid size={12}>
                    <Typography variant={'h5'} align='start' mt={4}>
                        Fundamental Data</Typography>
                </Grid>
                <Grid size={12} mt={2}>
                    <Skeleton height={1} />
                </Grid>
                        
            </Grid>

            
    </Grid>
    );
}