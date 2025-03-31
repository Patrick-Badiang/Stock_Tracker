import { Card, styled } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import ChangePortfolioButton from '../Components/ChangePortfolioButton';
import PortfolioValues from '../Components/PortfolioValues';

const Skeleton = styled('div')(({ theme, height }) => ({
    backgroundColor: theme.palette.action.hover,
    borderRadius: theme.shape.borderRadius,
    height,
    content: '" "',
  }));

export default function home(){
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