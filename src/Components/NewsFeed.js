import { useContext, useEffect } from "react";

import axios from "axios";
import { List, ListItem } from "@mui/material";

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
        <ListItem key={index} sx={{ width: "100%", height: 100 }}>
          <a href={article.url} target="_blank" rel="noopener noreferrer">
            {article.title} - {article.company}
          </a>
        </ListItem>
      ))}
    </List>
  );
}
