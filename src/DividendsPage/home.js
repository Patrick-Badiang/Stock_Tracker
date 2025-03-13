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
            <Grid size={12}> {/* Dividends Bar Char*/}
              <Skeleton height={300} />
            </Grid>

            <Grid size={12}>
              <Box height={14} />
            </Grid>

            <Grid size={3}>
              <Skeleton height={100} >
                Value
              </Skeleton>
            </Grid>
            <Grid size={3}>
              <Skeleton height={100} >
                Dividend Growth (TTM)
              </Skeleton>
            </Grid>
            <Grid size={3}>
              <Skeleton height={100} >
                Latest Dividend
              </Skeleton>
            </Grid>
            <Grid size={3}>
              <Skeleton height={100} >
                Dividend Yield
              </Skeleton>
            </Grid>

            <Grid size={12}>
              <Box height={14} />
            </Grid>

            <Grid size={12}> {/* All Companies with their Dividends*/}
              <Skeleton height={500} />
            </Grid>
        </Grid>
    );
}