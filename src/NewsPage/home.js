import { Box, styled } from '@mui/material';
import Grid from '@mui/material/Grid2';

const Skeleton = styled('div')(({ theme, height }) => ({
    backgroundColor: theme.palette.action.hover,
    borderRadius: theme.shape.borderRadius,
    height,
    content: '" "',
  }));

export default function home(){
    return (
    <Grid container spacing={1}>
            <Grid size={4}>
              <Skeleton height={70} />
            </Grid>
            <Grid size={12}>
              <Box height={100} />
            </Grid>

            <Grid size={12}>
              <Skeleton height={100} />
            </Grid>
            <Grid size={12}>
              <Skeleton height={100} />
            </Grid>
            <Grid size={12}>
              <Skeleton height={100} />
            </Grid>
            <Grid size={12}>
              <Skeleton height={100} />
            </Grid>
            
        </Grid>
    );
}