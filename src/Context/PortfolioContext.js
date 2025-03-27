import { createContext, useContext, useState, useEffect } from "react";

// Create a context
const PortfolioContext = createContext();

// Create a provider
export function PortfolioProvider({ children }) {
    const [selectedPortfolio, setSelectedPortfolio] = useState(null);
    const [portfolioData, setPortfolioData] = useState(null);

    // Function to load portfolio data dynamically
    useEffect(() => {
        if (selectedPortfolio) {
            import(`../FakeData/${selectedPortfolio.file}`)
                .then((module) => setPortfolioData(module.default))
                .catch((error) => console.error("Error loading portfolio file:", error));
        }
    }, [selectedPortfolio]);

    return (
        <PortfolioContext.Provider value={{ selectedPortfolio, setSelectedPortfolio, portfolioData }}>
            {children}
        </PortfolioContext.Provider>
    );
}

// Custom hook to use portfolio context
export function usePortfolio() {
    return useContext(PortfolioContext);
}
