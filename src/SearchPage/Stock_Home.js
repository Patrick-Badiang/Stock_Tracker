import { Box, styled, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import SearchBar from '../Components/SearchBar';
import StockChart from '../Components/StockChat';

import stockData from '../FakeData/CompanyOverview.json';
import FundamentalText from '../Components/Fundamental_Text';
import { useEffect, useState } from 'react';
import axios from "axios";
import RevenueChart from '../Components/RevenueChart';

const Skeleton = styled('div')(({ theme, height }) => ({
    backgroundColor: theme.palette.action.hover,
    borderRadius: theme.shape.borderRadius,
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: '1px',
    height,
    content: '" "',
  }));

// Function to format large numbers (Billions or Trillions)
const formatNumber = (number) => {
    if (number >= 1_000_000_000_000) {
        return `${(number / 1_000_000_000_000).toFixed(1)}T`;
    } else if (number >= 1_000_000_000) {
        return `${(number / 1_000_000_000).toFixed(1)}B`;
    }
    return number; // Return as is if less than a billion (you might want to format differently)
};

export default function Stock_Home(){
    const [revenueData, setRevenueData] = useState(null);

    const handleSearch = async (value) => { //Take the value and call stock data API
        console.log("Search Value: ", value);

        try {
            const response = await axios.get(`http://127.0.0.1:3001/stock/revenue?ticker=${value}`); // Replace with your API URL
            setRevenueData(response.data);
          } catch (error) {
            console.error("Error fetching revenue data:", error);
          }
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
                                    <FundamentalText label="Market Cap" value={`$${formatNumber(stockData.MarketCapitalization)}`} />
                                    <FundamentalText label="Forward PE Ratio" value={stockData.ForwardPE} />
                                    <FundamentalText label="Dividend Yield" value={`${(stockData.DividendYield * 100).toFixed(1)}%`} />
                                    <FundamentalText label="EV To EBITDA" value={stockData.EVToEBITDA} />
                                    <FundamentalText label="Dividend per Share" value={`$${stockData.DividendPerShare}`} />
                                </Grid>

                                <Grid container size={6} direction={'column'} spacing={1}>
                                    <FundamentalText label="Revenue TTM" value={`$${formatNumber(stockData.RevenueTTM)}`} />
                                    <FundamentalText label="Profit Margin" value={`${(stockData.ProfitMargin * 100).toFixed(1)}%`} />
                                    <FundamentalText label="Operating Margin" value={`${(stockData.OperatingMarginTTM * 100).toFixed(1)}%`} />
                                    <FundamentalText label="50 Day MA" value={`$${parseFloat(stockData["50DayMovingAverage"]).toFixed(1)}`} />
                                    <FundamentalText label="52 Week High/Low" value={`$${parseFloat(stockData["52WeekHigh"]).toFixed(1)}/$${parseFloat(stockData["52WeekLow"]).toFixed(1)}`} />
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
                <Grid size={12} mt={2}>
                    <div>
                        <h1>Stock Revenue Visualization</h1>
                        {revenueData ? <RevenueChart revenueData={revenueData} /> : <p>Loading...</p>}
                    </div>
                </Grid>
            </Grid>


    </Grid>
    );
}