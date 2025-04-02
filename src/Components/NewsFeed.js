import { useContext, useEffect } from "react";

import axios from "axios";
import { Box, List, ListItem, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { NewsContext } from "../Context/NewsContext";

// const Skeleton = styled("div")(({ theme, height }) => ({
//   backgroundColor: theme.palette.action.hover,
//   borderRadius: theme.shape.borderRadius,
//   borderColor: "black",
//   borderStyle: "solid",
//   borderWidth: "1px",
//   height,
//   content: '" "',
// }));

export default function NewsFeed() {
  const { news, setNews, loading, setLoading, error, setError } = useContext(NewsContext);

    useEffect(() => {
        setLoading(true);
        axios
            .get("http://127.0.0.1:3001/api/news")
            .then((response) => {
                try {
                    const parsedData = JSON.parse(response.data);
                    if (Array.isArray(parsedData)) {
                        setNews(parsedData);
                    } else {
                        throw new Error("Response is not an array");
                    }
                } catch (error) {
                    throw new Error("Invalid JSON format received from API");
                }
            })
            .catch((error) => {
                console.error("Error fetching news:", error);
                setError("Failed to load news");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [setNews, setLoading, setError]);  // Dependencies to avoid unnecessary re-fetching


  if (loading) {
    return <p>Loading news...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <List sx={{ width: "100%", height: 600, overflowY: "auto" }}>
      {news.map((article, index) => (
        <ListItem key={index} sx={{ width: "100%", height: 130, mb: 1, textDecoration: "none", color: "inherit"}}
          component="a" 
          href={article.url} 
          target="_blank" 
          rel="noopener noreferrer">
           
          <Box  sx={{ width: "100%", height: "100%", border: "1px solid black", borderRadius: 2, padding: 2, overflow: "hidden" }}>
           
             
              <Grid container size={12} direction={'column'} spacing={1}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h5" align="start">
                    {article.title} - {article.company} 
                  </Typography>
                  
                </Grid>
                <Grid item xs={12} md={6}>
                  
                  <Typography align="start" variant="body2">
                    {article.description}
                  </Typography>
                </Grid>
              </Grid>
          </Box>
          
        </ListItem>
      ))}
    </List>
  );
}
