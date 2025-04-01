import { useState, useEffect } from "react";
import { debounce } from "lodash";
import axios from "axios";
import { TextField, InputAdornment } from "@mui/material";
import { Search } from "@mui/icons-material";

const API_ENDPOINT = process.env.REACT_APP_API_URL || "https://www.alphavantage.co/query"; // Placeholder for future AWS endpoint
const API_KEY = process.env.REACT_APP_ALPHA_API_KEY; // Use environment variable for easy switch

export default function SearchBar() {
    const [query, setQuery] = useState("");

    // Function to fetch data from API
    const fetchSearchResults = async (searchTerm) => {
        if (!searchTerm) return;

        try {
            const response = await fetch(`${API_ENDPOINT}`, {
                params: {
                    function: "SYMBOL_SEARCH",
                    keywords: searchTerm,
                    apikey: API_KEY
                }
            });
            // onResults(response.data);
            console.log("API Response:", searchTerm);
        } catch (error) {
            console.error("API Error:", error);
        }
    };

    // Debounced search function
    const debouncedSearch = debounce(fetchSearchResults, 300);

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
