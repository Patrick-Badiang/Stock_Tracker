import { Box, styled, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import SearchBar from '../Components/SearchBar';
import StockChart from '../Components/StockChat';

import stockData from '../FakeData/CompanyOverview.json';
import FundamentalText from '../Components/Fundamental_Text';

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
                            <Grid container spacing={2} size={12} direction={'row'} alignContent={'center'}>
                                <Grid container size={6} direction={'column'} spacing={1}>
                                    <FundamentalText label="Market Cap" value={`$${stockData.MarketCapitalization}`} />
                                    <FundamentalText label="Forward PE Ratio" value={stockData.ForwardPE} />
                                    <FundamentalText label="Dividend Yield" value={stockData.DividendYield} />
                                    <FundamentalText label="EBITDA" value={stockData.EBITDA} />
                                    <FundamentalText label="Dividend per Share" value={stockData.DividendPerShare} />
                                </Grid>

                                <Grid container size={6} direction={'column'} spacing={1}>
                                    <FundamentalText label="Revenue TTM" value={stockData.RevenuePerShareTTM} />
                                    <FundamentalText label="Profit Margin" value={stockData.ProfitMargin} />
                                    <FundamentalText label="50 Day MA" value={`$${stockData["50DayMovingAverage"]}`} />
                                    <FundamentalText label="52 Week High/Low" value={`$${stockData["52WeekHigh"]}/$${stockData["52WeekLow"]}`} />
                                    <FundamentalText label="Shares Outstanding" value={stockData.SharesOutstanding} />
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