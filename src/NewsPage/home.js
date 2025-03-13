import { Box} from '@mui/material';
import Grid from '@mui/material/Grid2';
import SearchBar from '../Components/SearchBar';
import NewsFeed from '../Components/NewsFeed';



export default function home(){


    const handleSearch = (value) => { //Take the value and call stock news API 
        console.log("Search Value: ", value);
    }
    return (
    <Grid container spacing={1}>
            <Grid size={4}>
                <SearchBar onSearch={handleSearch} />
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