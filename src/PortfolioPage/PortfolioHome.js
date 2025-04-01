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
                                                <Grid container size={12} direction={'row'} spacing={1} >
                                                    <Grid size={4}>
                                                        <Typography variant='body1' fontWeight={'bold'}>
                                                            {stock.symbol}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid size={4} container direction={'row'} justifyContent={'center'}>
                                                        <Grid item>
                                                        <Typography variant='body1'>
                                                            ${stock.bought_price.toLocaleString()} 
                                                        </Typography>
                                                        </Grid>
                                                        <Grid item>
                                                        <Typography variant='body2' color={'grey.500'}>
                                                            ({stock.quantity})
                                                        </Typography>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid size={4} container direction={'column'} justifyContent={'center'}>
                                                        <Grid item>
                                                        <Typography variant='body'>
                                                            ${((stock.quantity || 0) * (stock.current_price || 0)).toLocaleString()}
                                                        </Typography>
                                                        </Grid>
                                                        <Grid item>
                                                        <Typography variant='body2' fontWeight={'bold'} 
                                                        sx={{ color: ((stock.quantity || 0) * (stock.current_price || 0)) - ((stock.quantity || 0) * (stock.bought_price || 0)) >= 0 ? "green" : "red" }}>
                                                            {((stock.quantity || 0) * (stock.current_price || 0)) - ((stock.quantity || 0) * (stock.bought_price || 0)) >= 0 ? "+" : "-"}
                                                            ${Math.abs(((stock.quantity || 0) * (stock.current_price || 0)) - ((stock.quantity || 0) * (stock.bought_price || 0))).toLocaleString()}
                                                            {/* Percentage change*/}
                                                            ({(Math.abs((((stock.current_price || 0) - ( stock.bought_price || 0)) /  (stock.bought_price || 0)) * 100)).toFixed(2)}%)
                                                        </Typography>
                                                        </Grid>

                                                        
                                                    </Grid>
                                                </Grid>
                                                {/* <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 1 }}>
                                                    <span>{stock.symbol}</span>
                                                    <span></span>
                                                    <span></span>
                                                </Box> */}
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