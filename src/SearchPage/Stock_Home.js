import { Box, Button, Container, styled, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import SearchBar from '../Components/SearchBar';
import StockChart from '../Components/StockChat';

import stockData from '../FakeData/CompanyOverview.json';
import FundamentalText from '../Components/Fundamental_Text';
import { useEffect, useState } from 'react';
import axios from "axios";
import VisualizedChart from '../Components/VisualizedChart';

import stockList from '../Database/stock_list.json';

import {getCikFromTicker} from '../Database/API_calls.js';

const Skeleton = styled('div')(({ theme, height }) => ({
    backgroundColor: theme.palette.action.hover,
    borderRadius: theme.shape.borderRadius,
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: '1px',
    height,
    content: '" "',
    width: '100%',
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
    const [sharesOutstandingData, setSharesOutstandingData] = useState(null);

    const [stockSymbol, setStockSymbol] = useState(null);
    const [stockName, setStockName] = useState(null);

    const handleAddToPortfolio = () => {
        console.log("Add to Portfolio clicked");
        // Add your logic to add the stock to the portfolio
        /*
        {
            "symbol": "AMZN",
            "sector": "Technology",
            "quantity": 25,
            "bought_price": 200,
            "current_price": 250,
            "week_high": 300,
            "week_low": 150,
            "latest_five_week_close": [240, 245, 250, 255, 280]
        },
        */
    };
    const handleAddToWatchlist = () => {
        console.log("Add to Watchlist clicked");
        // Add your logic to add the stock to the watchlist
        /*
        {
            "symbol": "AMZN",
            "sector": "Technology",
            "quantity": 25,
            "bought_price": 200,
            "current_price": 250,
            "week_high": 300,
            "week_low": 150,
            "latest_five_week_close": [240, 245, 250, 255, 280]
        },
        */
    };


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
    
    const parseSharesOutstandingData = (data) => {
        if (!data || !data.units || !data.units["shares"]) return null;
    
        const sharesOutstandingEntries = data.units["shares"];
    
        // Filter for annual data (10-K & FY)
        const filtered = sharesOutstandingEntries.filter(entry => entry.form === "10-K" && entry.fp === "FY");
    
        // Group by true calendar year extracted from `frame` or fallback to `fy`
        const grouped = filtered.reduce((acc, curr) => {
            let year;
    
            if (curr.frame && /^CY\d{4}$/.test(curr.frame)) {
                year = parseInt(curr.frame.slice(2)); // Extract year from CYxxxx
            } else {
                year = curr.fy; // fallback
            }
    
            // Keep latest filed entry per year
            if (!acc[year] || new Date(curr.filed) > new Date(acc[year].filed)) {
                acc[year] = { ...curr, trueYear: year };
            }
    
            return acc;
        }, {});
    
        // Convert to array and sort by year
        const sharesOutstandingValue = Object.values(grouped)
            .sort((a, b) => a.trueYear - b.trueYear)
            .map(entry => ({
                fy: entry.trueYear,
                shares: entry.val
            }));
    
        const labels = sharesOutstandingValue.map(entry => entry.fy.toString());
        const shares = sharesOutstandingValue.map(entry => entry.shares / 1e9); // Convert to billions
    
        return { labels, shares };
    };
    

    const handleSearch = async (value) => {
        // console.log("Search Value: ", value);

        // Check if the value is in the stockList
        const stock = stockList.find(stock => stock.Symbol === value);
        // stockData.filter(stock => stock.Symbol === query);
        if (!stock) {
            console.error("Stock not found in the list");
            return;
        }

        // console.log("Stock name:", stock.Name);

        setStockSymbol(value);
        setStockName(stock.Name);
        
        try {
            // const cik = await axios.get(`http://127.0.0.1:3001/stock/cik?ticker=${value}`);
            const cik = getCikFromTicker(value);
            console.log("CIK:", cik);
            // console.log("CIK Data:", cik.data.CIK);
            const response = await axios.get(`http://127.0.0.1:3001/stock/revenue?cik=${cik}`);
            const epsResponse = await axios.get(`http://127.0.0.1:3001/stock/eps?cik=${cik}`);
            const sharesOutstandingResponse = await axios.get(`http://127.0.0.1:3001/stock/sharesOutstanding?cik=${cik}`);

            console.log("Shares Outstanding Data:", sharesOutstandingResponse.data);
            // Parse Revenue Data
            const parsedRevenueData = parseRevenueData(response.data);
            
            // Parse EPS Data
            const parsedEPSData = parseEPSData(epsResponse.data);

            // Parse Shares Outstanding Data
            const parsedSharesOutstandingData = parseSharesOutstandingData(sharesOutstandingResponse.data);
    
            // Set State
            // console.log("Parsed Revenue Data:", parsedRevenueData);
            setRevenueData(parsedRevenueData);
            setEPSData(parsedEPSData);
            setSharesOutstandingData(parsedSharesOutstandingData);

            
            
    
            // console.log("EPS Data:", parsedEPSData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }

    };
    
    if (!stockSymbol || !stockName) {
        return (
            <Grid container spacing={10} alignContent={'center'} direction={'column'} justifyContent={'space-evenly'}>
                {/* <Grid size={5} /> */}
                <Grid size={12}>
                    <SearchBar onSearch={handleSearch}/>
                </Grid>
                <Grid size={12}>
                    <Box height={40} />
                </Grid>
                {/* Popular Indices*/}
                <Grid container direction ={'row'} size={12} spacing={1} mt={4}>
                    <Grid size={12}>
                        <Typography variant={'h5'} align='start'>
                            Popular Indices</Typography>
                    </Grid>
                    <Grid size={4}>
                        <Skeleton height={100} />
                    </Grid>
                    <Grid size={4}>
                        <Skeleton height={100} />
                    </Grid>
                    <Grid size={4}>
                        <Skeleton height={100} />
                    </Grid>
                    
                </Grid>

                {/*ETFs */}
                
                <Grid container direction ={'row'} size={12} spacing={1} mt={4}>
                    <Grid size={12}>
                        <Typography variant={'h5'} align='start'>
                            Popular ETFs</Typography>
                    </Grid>
                    <Grid size={3}>
                        <Skeleton height={100} />
                    </Grid>
                    <Grid size={3}>
                        <Skeleton height={100} />
                    </Grid>
                    <Grid size={3}>
                        <Skeleton height={100} />
                    </Grid>
                    <Grid size={3}>
                        <Skeleton height={100} />
                    </Grid>
                </Grid>
                
                
            </Grid>
        );
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
                <Button 
                    variant="contained" 
                    color="transparent" 
                    sx = {{height: 40, width: '50%%', mr: '5px'}}
                    onClick={() => handleAddToPortfolio()}
                    >
                        Add to Portfolio
                    </Button>
                <Button 
                    variant="contained" 
                    color="transparent" 
                    sx = {{height: 40, width: '50%%', ml: '5px'}}
                    onAbort={() => handleAddToWatchlist()}
                    >
                        Add to Watchlist
                    </Button>
            </Grid>
            <Grid size={4} offset={{ md: 3.7 }}>
                {/* <Skeleton height={100} /> */}
                <Box height={100} sx = {{textAlign: 'center'}}>
                    <Typography variant={'h4'} sx= {{mt: '5px'}}>{stockSymbol}</Typography>
                    <Typography variant={'body1'}>({stockName})</Typography>
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
                            title = "Revenue"
                            unitLabel = "Revenue (Billion USD)"
                            labels={revenueData.labels}
                            annualRevenues={revenueData.annualRevenues} 
                            quarterlyRevenues={revenueData.quarterlyRevenues} 
                            color = "rgba(75, 192, 192, 0.6)"/> : <p>Loading...</p>}
                </Grid>
                <Grid container size={4}>
                    {epsData ? <VisualizedChart 
                            title = "EPS"
                            unitLabel = "EPS (USD)"
                            labels={epsData.labels}
                            annualRevenues={epsData.annualEPS} 
                            // quarterlyRevenues={epsData.quarterlyEPS} 
                            color = "rgba(186, 175, 57, 0.6)"/> : <p>Loading...</p>}
                </Grid>
                <Grid container size={4}>
                    {sharesOutstandingData ? <VisualizedChart 
                            unitLabel = "Shares (Billions)"
                            labels={sharesOutstandingData.labels}
                            annualRevenues={sharesOutstandingData.shares} 
                            // quarterlyRevenues={epsData.quarterlyEPS}
                            title='Shares Outstanding'     
                            color = "rgba(56, 41, 193, 0.6)"/> : <p>Loading...</p>}
                </Grid>
                <Grid container size={12}>
                        <Box height={20} />
                </Grid>
                <Grid container size={4}>
                    {sharesOutstandingData ? <VisualizedChart 
                            unitLabel = "Shares (Billions)"
                            labels={sharesOutstandingData.labels}
                            annualRevenues={sharesOutstandingData.shares} 
                            // quarterlyRevenues={epsData.quarterlyEPS}
                            title='Operating Margins'     
                            color = "rgba(56, 41, 193, 0.6)"/> : <p>Loading...</p>}
                </Grid>
                {/*}
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