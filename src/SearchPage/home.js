import { Box, Divider, styled, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

const Skeleton = styled('div')(({ theme, height }) => ({
    backgroundColor: theme.palette.action.hover,
    borderRadius: theme.shape.borderRadius,
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: '1px',
    height,
    content: '" "',
  }));

export default function home(){
    return (
    <Grid container spacing={1} alignContent={'center'}>
            <Grid size={5} />
            <Grid size={12}>
                <Skeleton height={60} />
            </Grid>
            <Grid size={12}>
                <Box height={40} />
            </Grid>
            <Grid size={4} offset={{ md: 3.7 }}>
                <Skeleton height={100} />
            </Grid>
            

            <Grid size={12} mt={4} >
                {/* Stock Graph and other Values*/}
                <Grid container spacing={3}  offset={{ md: 1.3 }}>
                    <Grid size={5}>
                        <Skeleton height={300} />
                    </Grid>
                    <Grid size={5}>
                        <Skeleton height={300} />
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
                        
            </Grid>

            
    </Grid>
    );
}