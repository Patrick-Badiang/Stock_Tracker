import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { usePortfolio } from "../Context/PortfolioContext";
import { Typography } from "@mui/material";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StockWatcher = ({ unit}) => {
  // Simulated stock TTM price changes (negative values indicate below usual levels)
  // const stockData = [
  //   { name: "Company A", change: -12 },
  //   { name: "Company B", change: -8 },
  //   { name: "Company C", change: -15 },
  //   { name: "Company D", change: 6 },
  //   { name: "Company E", change: -10 },
  // ];

  const { portfolioData } = usePortfolio(); // Access global portfolio data
  if (!portfolioData) {
    return (
      <div className="p-4 bg-white shadow-lg rounded-lg w-full max-w-lg" style={{ height: "100%" }}>
        <h2 className="text-xl font-bold mb-4">No portfolio data available</h2>
      </div>
    );
  }

  const data = {
    labels: portfolioData.stock.map(stock => stock.symbol),
    datasets: [
        {
            label: `% Difference from 5-Day SMA`,
            data: portfolioData.stock.map(stock => {
                const closes = stock.latest_five_week_close || [];
                const sum = closes.reduce((sum, close) => sum + close, 0);
                const sma = sum / 5;

                // Calculate percentage difference relative to SMA
                return ((sma - stock.current_price) / stock.current_price) * 100;
            }),
            backgroundColor: portfolioData.stock.map(stock => {
                const closes = stock.latest_five_week_close || [];
                const sum = closes.reduce((sum, close) => sum + close, 0);
                const sma = sum / 5;

                // Red if current price is below SMA, Green if above
                return stock.current_price > sma ? "#FF4C4C" : "#4CAF50"; 
            }),
            borderColor: "black",
            borderWidth: 1,
        },
    ],
};
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return `${unit}${value}`;
          },
        },
      },
    },
  };

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg w-full max-w-lg" style={{ height: "100%" }}>
      <Typography variant="body" fontWeight={'bold'}>Price to SMA</Typography>
      <Bar data={data} options={options}  />
    </div>
  );
};

export default StockWatcher;
