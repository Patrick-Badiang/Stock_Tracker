import { useState, useEffect } from "react";
import { debounce } from "lodash";
import { TextField, InputAdornment, List, ListItem, ListItemText, Paper } from "@mui/material";
import { Search } from "@mui/icons-material";



import stockData from "../Database/stock_list.json"; // Ensure this JSON file is stored in your project

// Function to perform "best match" search
export function bestMatchSearch(query, topN = 5) {
    if (!query) return [];

    query = query.toUpperCase();

    // Step 1: Exact match
    const exactMatches = stockData.filter(stock => stock.Symbol === query);

    // Step 2: Prefix match (stocks where the symbol starts with the query)
    const prefixMatches = stockData.filter(stock => stock.Symbol.startsWith(query));

    // Step 3: Fuzzy match (stocks with names that contain the query)
    const fuzzyMatches = stockData.filter(stock => stock.Name.toUpperCase().includes(query));

    // Combine results while removing duplicates (Exact > Prefix > Fuzzy)
    const uniqueResults = new Map();
    [...exactMatches, ...prefixMatches, ...fuzzyMatches].forEach(stock => {
        uniqueResults.set(stock.Symbol, stock);
    });

    return Array.from(uniqueResults.values()).slice(0, topN);
}

export default function SearchBar() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);

    // Function to handle search input with debouncing
    const handleSearch = debounce((searchTerm) => {
        const matches = bestMatchSearch(searchTerm);
        setResults(matches);
    }, 200);

    const handleSelect = (symbol) => {
        setQuery(symbol);
        setResults([]);
        // Perform any action with the selected stock symbol
        console.log("Selected stock symbol:", symbol);
        // For example, you can redirect to another page or fetch stock data
    }

    useEffect(() => {
        handleSearch(query);
        return () => handleSearch.cancel();
    }, [query, handleSearch]);

    return (
        <div style={{ position: "relative", width: "100%" }}>
            <TextField
                fullWidth
                placeholder="Search for a stock"
                value={query}
                onChange={(e) => setQuery(e.target.value.toUpperCase())}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Search />
                        </InputAdornment>
                    ),
                }}
            />
            
            {/* Render results */}
            {results.length > 0 && (
                <Paper style={{ position: "absolute", width: "100%", zIndex: 10 }}>
                <List style={{ maxHeight: 300, overflowY: "auto" }}>
                    {results.map((stock) => (
                        <ListItem key={stock.Symbol} button onClick={() => handleSelect(stock.Symbol)}>
                            <ListItemText primary={`${stock.Symbol} - ${stock.Name}`} />
                        </ListItem>
                    ))}
                </List>
                
                {/* <List>
                    {results.map((stock, index) => (
                        <ListItem key={index} button onClick={() => handleSelect(stock["1. symbol"])}>
                            <ListItemText primary={stock["1. symbol"]} secondary={stock["2. name"]} />
                        </ListItem>
                    ))}
                </List> */}
            </Paper>
            )}
        </div>
    );
}