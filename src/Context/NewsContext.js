import { createContext, useState } from "react";

export const NewsContext = createContext();

export const NewsProvider = ({ children }) => {
    const [news, setNews] = useState([]);  // Global news state
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    return (
        <NewsContext.Provider value={{ news, setNews, loading, setLoading, error, setError }}>
            {children}
        </NewsContext.Provider>
    );
};
