import { styled } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import ChangePortfolioButton from '../ChangePortfolioButton';

const Skeleton = styled('div')(({ theme, height }) => ({
    backgroundColor: theme.palette.action.hover,
    borderRadius: theme.shape.borderRadius,
    height,
    content: '" "',
  }));

export default function home(){
    return (
              <Grid container spacing={1}>
                  <Grid size={6}>
                      <ChangePortfolioButton/>
                  </Grid>
                  <Grid size={12}>
                      <Skeleton height={800} />
                  </Grid>
              </Grid>
  );
}