import { Box} from '@mui/material';
import Grid from '@mui/material/Grid2';
import SearchBar from '../Components/SearchBar';
import NewsFeed from '../Components/NewsFeed';
import { useContext } from 'react';
import { NewsContext } from '../Context/NewsContext';
import axios from 'axios';



export default function News_Home(){
    const { setNews, setLoading, setError } = useContext(NewsContext);

    const handleSearch = async (value) => {
        if (!value) return;

        console.log("Searching for news on:", value);
        setLoading(true);

        try {
            // Use axios to call the API
            const response = await axios.get(`http://127.0.0.1:3001/stock/news?ticker=${encodeURIComponent(value)}`);

            // Ensure we handle the response properly
            const data = JSON.parse(response.data);

            if (Array.isArray(data)) {
                setNews(data); // Updates global news
            } else {
                throw new Error("Invalid response format");
            }
        } catch (error) {
            console.error("Error fetching stock news:", error);
            setError(error.message || "Failed to fetch stock news");
        } finally {
            setLoading(false);
        }
    };
    
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