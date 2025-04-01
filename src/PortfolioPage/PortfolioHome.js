import { Card, List, styled, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import ChangePortfolioButton from '../Components/ChangePortfolioButton';
import PortfolioValues from '../Components/PortfolioValues';
import { usePortfolio } from '../Context/PortfolioContext';
import StockWatcher from '../HomePage/StockWatcher';
import CAGRChart from './CAGRChart';

const Skeleton = styled('div')(({ theme, height }) => ({
    backgroundColor: theme.palette.action.hover,
    borderRadius: theme.shape.borderRadius,
    height,
    content: '" "',
  }));

export default function Home(){

    const { portfolioData } = usePortfolio(); // Access global portfolio data

    if (!portfolioData) {
        return (
            <Grid container direction='column' spacing={1}>
            <Grid size={6}>
                  <ChangePortfolioButton/>
            </Grid>
            <Card elevation = {2}>
                  <Box sx = {{height: 800, width: '100%'}}>
                          <Grid container direction= 'row' size={12} spacing={1} m={1}>
                              
                              {/* Portfolio Values and Stocks*/}
                              <Grid container size={6} direction={'column'}>
  
                                  {/* Portfolio Values*/}
                                  <Grid size={12}>
                                      <PortfolioValues/>
                                  </Grid>
                                  <Grid size= {12}>
                                      <Skeleton height={705} />
                                      
                                  </Grid>
                              </Grid>
                              
                              {/* Graphs and charts*/}
                              <Grid container size={6} direction={'column'}>
  
                                  {/* Portfolio Values*/}
                                  <Grid size={12}>
                                      <Skeleton height={385} />
                                  </Grid>
                                  <Grid size= {12}>
                                      <Skeleton height={385} />
                                  </Grid>
                              </Grid>
                          </Grid>
                  </Box>
            </Card>
        </Grid>
        );
    }

    // const sampleData = [
    //     { year: "2019", cagr: 5.2 },
    //     { year: "2020", cagr: 7.8 },
    //     { year: "2021", cagr: 6.5 },
    //     { year: "2022", cagr: 8.1 },
    //     { year: "2023", cagr: 9.4 },
    //   ];
      
      
      

    return (
      <Grid container direction='column' spacing={1}>
          <Grid size={6}>
                <ChangePortfolioButton/>
          </Grid>
          <Card elevation = {2}>
                <Box sx = {{height: 800, width: '100%'}}>
                        <Grid container direction= 'row' size={12} spacing={1} >
                            
                            {/* Portfolio Values and Stocks*/}
                            <Grid container size={6} direction={'column'}>

                                {/* Portfolio Values*/}
                                <Grid size={12}>
                                    <PortfolioValues/>
                                    
                                </Grid>
                                <Grid size= {12} m={1}>
                                    {/* <Skeleton height={705} /> */}
                                    <Box height={650} sx={{border: 1, borderColor: 'grey.300', borderRadius: 2, padding: 2}}>
                                        <Typography variant='h3' >
                                            Stocks
                                        </Typography>
                                        <List sx={{ maxHeight: 700, width: "100%", overflowY: 'auto' }}>
                                        {portfolioData.stock.map((stock) => (
                                            <List key={stock.symbol}>
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 1 }}>
                                                    <span>{stock.symbol}</span>
                                                    <span>${((stock.quantity || 0) * (stock.bought_price || 0)).toLocaleString()}</span>
                                                    
                                                </Box>
                                            </List>
                                        ))}
                                        </List>
                                    </Box>
                                </Grid>
                            </Grid>
                            
                            {/* Graphs and charts*/}
                            <Grid container size={6} direction={'column'} alignContent={'flex-end'} spacing={4} >

                                {/* Portfolio Values*/}
                                <Grid size={11} mr={2}>
                                    {/* <Skeleton height={385} /> */}
                                    <Box height={360}>
                                        <StockWatcher unit="%" stockData={portfolioData.stock}/>
                                    </Box>      
                                    
                                </Grid>
                                
                                <Grid size= {11}>
                                    {/* <Skeleton height={385} /> */}
                                    <Box height={360}>
                                        <CAGRChart dataPoints={portfolioData.performance} />
                                    </Box>
                                </Grid>
                            </Grid>
                                
                                
                        </Grid>
                </Box>
          </Card>
      </Grid>
  );
}