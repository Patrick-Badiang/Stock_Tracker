import { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";
import axios from "axios";
import { TextField, InputAdornment, List, ListItem, ListItemText, Paper } from "@mui/material";
import { Search } from "@mui/icons-material";

const API_ENDPOINT = process.env.REACT_APP_SEARCH_API_ENDPOINT || "https://www.alphavantage.co/query";
const API_KEY = process.env.REACT_APP_ALPHA_API_KEY;

export default function SearchBar() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]); // Store search results
    const [showResults, setShowResults] = useState(false); // Control visibility

    // Function to fetch data from API
    const fetchSearchResults = async (searchTerm) => {
        if (!searchTerm) return;

        // try {
        //     const response = await axios.get(API_ENDPOINT, {
        //         params: {
        //             function: "SYMBOL_SEARCH",
        //             keywords: searchTerm,
        //             apikey: API_KEY
        //         }
        //     });

        //     if (response.data.bestMatches) {
        //         setResults(response.data.bestMatches); // Update state with results
        //         setShowResults(true);
        //     }
        // } catch (error) {
        //     console.error("API Error:", error);
        // }
        console.log("API Call:", searchTerm);
    };

    // Debounced search function
    const debouncedSearch = useCallback(debounce(fetchSearchResults, 500), []);

    // Handle search query change
    useEffect(() => {
        if (query) debouncedSearch(query);
        return () => debouncedSearch.cancel();
    }, [query]);

    // Handle item click (optional: populate input with selection)
    const handleSelect = (symbol) => {
        setQuery(symbol);
        setShowResults(false);
    };

    return (
        <div style={{ position: "relative", width: "100%" }}>
            <TextField
                fullWidth
                placeholder="Search for a stock"
                value={query}
                onChange={(e) => setQuery(e.target.value.toUpperCase())}
                onFocus={() => setShowResults(true)}
                onBlur={() => setTimeout(() => setShowResults(false), 200)} // Delay hiding so click can register
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Search />
                        </InputAdornment>
                    ),
                }}
            />
            {showResults && results.length > 0 && (
                <Paper style={{ position: "absolute", width: "100%", zIndex: 10 }}>
                    <List>
                        {results.map((stock, index) => (
                            <ListItem key={index} button onClick={() => handleSelect(stock["1. symbol"])}>
                                <ListItemText primary={stock["1. symbol"]} secondary={stock["2. name"]} />
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            )}
        </div>
    );
}
