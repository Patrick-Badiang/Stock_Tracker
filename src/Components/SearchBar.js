import { useState, useEffect } from "react";
import { debounce } from "lodash";
import axios from "axios";
import { TextField, InputAdornment } from "@mui/material";
import { Search } from "@mui/icons-material";

const API_ENDPOINT = process.env.REACT_APP_SEARCH_API_ENDPOINT || "https://www.alphavantage.co/query"; // Placeholder for future AWS endpoint
const API_KEY = process.env.REACT_APP_ALPHA_API_KEY; // Use environment variable for easy switch

export default function SearchBar() {
    const [query, setQuery] = useState("");

    // Function to fetch data from API
    const fetchSearchResults = async (searchTerm) => {
        if (!searchTerm) return;

        try {
            const response = await axios.get(`${API_ENDPOINT}`, {
                params: {
                    function: "SYMBOL_SEARCH",
                    keywords: searchTerm,
                    apikey: API_KEY
                }
            });
            // onResults(response.data);
            // console.log("API Searching with key: ", searchTerm);
            // console.log(response.data);
        } catch (error) {
            console.error("API Error:", error);
        }
    };

    // Debounced search function
    const debouncedSearch = debounce(fetchSearchResults, 500);

    useEffect(() => {
        if (query) debouncedSearch(query);
        return () => debouncedSearch.cancel();
    }, [query]);

    return (
        <TextField
            fullWidth
            placeholder="Search for a stock"
            value={query}
            onChange={(e) => setQuery(e.target.value.toUpperCase())}
            slotProps={{
                input:{
                    startAdornment: (
                    <InputAdornment position="start">
                        <Search />
                    </InputAdornment>
                    ),
                }}
            } />
    );
}
