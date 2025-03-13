import { Box, List, ListItem, styled } from '@mui/material';
import Grid from '@mui/material/Grid2';
import SearchBar from '../Components/SearchBar';
import NewsFeed from '../Components/NewsFeed';



export default function home(){
    return (
    <Grid container spacing={1}>
            <Grid size={4}>
                <SearchBar />
            </Grid>
            <Grid size={12}>
                <Box height={100} />
            </Grid>

            <Grid size={12}>
                <NewsFeed />
            </Grid>
            
        </Grid>
    );
}