import { Box, styled, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import SearchBar from '../Components/SearchBar';
import StockChart from '../Components/StockChat';

import stockData from '../FakeData/CompanyOverview.json';
import FundamentalText from '../Components/Fundamental_Text';
import { useEffect, useState } from 'react';
import axios from "axios";
import VisualizedChart from '../Components/VisualizedChart';

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
    const [epsData, setEPSData] = useState(null);
    
    const parseRevenueData = (data) => {
        if (!data || !data.units || !data.units.USD) return null;
    
        // Extract annual (10-K) revenue
        const annualRevenuesValues = data.units.USD.filter(entry => entry.form === "10-K" && entry.frame && !entry.frame.includes("Q"));
        
        // Extract quarterly (10-Q) revenue
        const quarterlyRevenues = data.units.USD.filter(entry => entry.form === "10-Q" && entry.frame);
    
        // Sort by year (frame = CYYYYY)
        annualRevenuesValues.sort((a, b) => parseInt(a.frame.slice(2)) - parseInt(b.frame.slice(2)));
        quarterlyRevenues.sort((a, b) => parseInt(a.frame.slice(2, 6)) - parseInt(b.frame.slice(2, 6)));
        
        const labels = annualRevenuesValues.map(entry => entry.frame.slice(2));
        const annualRevenues = annualRevenuesValues.map(entry => entry.val / 1e9);
        return { labels, annualRevenues, quarterlyRevenues };
    };

    const parseEPSData = (data) => {
        if (!data || !data.units || !data.units["USD/shares"]) {
            console.warn("Invalid EPS Data:", data);
            return null;
        }
    
        // Extract EPS data entries
        const epsEntries = data.units["USD/shares"];
    
        // Filter for annual EPS data from 10-K or 10-K/A filings with FY designation
        const annualEPSRaw = epsEntries.filter(entry => 
            (entry.form === "10-K" || entry.form === "10-K/A") && entry.fp === "FY"
        );
    
        // Organize by fiscal year and select the latest reported value
        const annualEPSMap = {};
    
        annualEPSRaw.forEach(entry => {
            const fy = parseInt(entry.fy);
            if (!annualEPSMap[fy] || new Date(entry.filed) > new Date(annualEPSMap[fy].filed)) {
                annualEPSMap[fy] = { val: entry.val, filed: entry.filed };
            }
        });
    
        // Convert to an array and sort by fiscal year
        const annualEPSValue = Object.entries(annualEPSMap)
            .map(([fy, { val }]) => ({ fy: parseInt(fy), eps: val }))
            .sort((a, b) => a.fy - b.fy);
    
        // Prepare labels and values for annual EPS
        const labels = annualEPSValue.map(entry => entry.fy.toString());
        const annualEPS = annualEPSValue.map(entry => entry.eps);
    
        // Filter and sort quarterly EPS data
        const quarterlyEPS = epsEntries.filter(entry => entry.form === "10-Q" && entry.frame)
            .sort((a, b) => parseInt(a.frame.slice(2, 6)) - parseInt(b.frame.slice(2, 6)));
    
        return { labels, annualEPS, quarterlyEPS };
    };
    

    const handleSearch = async (value) => {
        // console.log("Search Value: ", value);
    
        try {
            const response = await axios.get(`http://127.0.0.1:3001/stock/revenue?ticker=${value}`);
            const epsResponse = await axios.get(`http://127.0.0.1:3001/stock/eps?ticker=${value}`);
    
            // Parse Revenue Data
            const parsedRevenueData = parseRevenueData(response.data);
            
            // Parse EPS Data
            const parsedEPSData = parseEPSData(epsResponse.data);
    
            // Set State
            // console.log("Parsed Revenue Data:", parsedRevenueData);
            setRevenueData(parsedRevenueData);
            setEPSData(parsedEPSData);
    
            console.log("EPS Data:", parsedEPSData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        // console.log("Revenue Data:", revenueData);

    };
    

    

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
            <Grid container size={12} mt={4}>
                <Grid size={12}>
                    <Typography variant={'h5'} align='start' mt={4}>
                        Fundamental Data</Typography>
                        <Grid size={12} mt={2}>
                    <Skeleton height={1} />
                </Grid>
                </Grid>
                
                <Grid container size={4}>
                    {revenueData ? <VisualizedChart 
                            unitLabel = "Revenue (Billion USD)"
                            labels={revenueData.labels}
                            annualRevenues={revenueData.annualRevenues} 
                            quarterlyRevenues={revenueData.quarterlyRevenues}
                            title='Revene' 
                            color = "rgba(75, 192, 192, 0.6)"/> : <p>Loading...</p>}
                </Grid>
                <Grid container size={4}>
                    {epsData ? <VisualizedChart 
                            unitLabel = "EPS (USD)"
                            labels={epsData.labels}
                            annualRevenues={epsData.annualEPS} 
                            quarterlyRevenues={epsData.quarterlyEPS}
                            title='EPS'   
                            color = "rgba(186, 175, 57, 0.6)"/> : <p>Loading...</p>}
                </Grid>
                {/* <Grid container size={4}>
                    {revenueData ? <VisualizedChart 
                            annualRevenues={revenueData.annualRevenues} 
                            title='Shares Outstanding'    
                            color = "rgba(56, 41, 193, 0.6)"/> : <p>Loading...</p>}
                </Grid>
                <Grid container size={4}>
                    {revenueData ? <VisualizedChart 
                            annualRevenues={revenueData} 
                            title='Operating Margin'      
                            color = "rgba(213, 235, 68, 0.6)"/> : <p>Loading...</p>}
                </Grid>
                <Grid container size={4}>
                    {revenueData ? <VisualizedChart r
                            annualRevenues={revenueData} 
                            title='Expenses'
                            color = "rgba(210, 127, 59, 0.6)"/> : <p>Loading...</p>}
                </Grid> */}

                
            </Grid>


    </Grid>
    );
}