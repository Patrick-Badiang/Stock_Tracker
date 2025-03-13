import { Card } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import ChangePortfolioButton from '../Components/ChangePortfolioButton';
import PortfolioValues from '../Components/PortfolioValues';

// const Skeleton = styled('div')(({ theme, height }) => ({
//     backgroundColor: theme.palette.action.hover,
//     borderRadius: theme.shape.borderRadius,
//     height,
//     content: '" "',
//   }));

export default function home(){
    return (
      <Grid container spacing={1}>
          <Grid size={6}>
                <ChangePortfolioButton/>
          </Grid>
          <Grid size={12}>
              {/* <Skeleton height={800} /> */}
                <Card elevation = {2}>
                <Box sx = {{height: 800, width: '100%'}}>
                    <Grid container size={12}>

                        {/* Portfolio Values*/}
                        <Grid size={6}>
                            <PortfolioValues/>
                        </Grid>
                    </Grid>

                </Box>
                </Card>
          </Grid>
      </Grid>
  );
}