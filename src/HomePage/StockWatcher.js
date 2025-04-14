import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { usePortfolio } from "../Context/PortfolioContext";
import { Typography } from "@mui/material";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StockWatcher = ({ unit }) => {
  const { portfolioData } = usePortfolio(); // Access global portfolio data

  if (!portfolioData) {
    return (
      <div className="p-4 bg-white shadow-lg rounded-lg w-full max-w-lg" style={{ height: "100%" }}>
        <h2 className="text-xl font-bold mb-4">No portfolio data available</h2>
      </div>
    );
  }

  // Build an array with computed values, symbol, and color
  const computedStocks = portfolioData.stock.map(stock => {
    const closes = stock.latest_five_week_close || [];
    // Make sure there are exactly 5 values to prevent NaN
    const sum = closes.reduce((sum, close) => sum + close, 0);
    const sma = closes.length ? sum / closes.length : 0;
    const percentDiff = ((sma - stock.current_price) / stock.current_price) * 100;
    const color = stock.current_price > sma ? "#FF4C4C" : "#4CAF50";
    return { symbol: stock.symbol, percentDiff, color };
  });

  // Sort the computed values from least to greatest
  computedStocks.sort((a, b) => a.percentDiff - b.percentDiff);

  // Extract sorted arrays for the chart
  const labels = computedStocks.map(stock => stock.symbol);
  const dataPoints = computedStocks.map(stock => stock.percentDiff);
  const backgroundColors = computedStocks.map(stock => stock.color);

  // Prepare the data for the Bar chart
  const data = {
    labels,
    datasets: [
      {
        label: `% Difference from 5-Day SMA`,
        data: dataPoints,
        backgroundColor: backgroundColors,
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
          callback: function (value) {
            return `${unit}${value}`;
          },
        },
      },
    },
  };

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg w-full max-w-lg" style={{ height: "100%" }}>
      <Typography variant="body" fontWeight={'bold'}>
        Price to SMA
      </Typography>
      <Bar data={data} options={options} />
    </div>
  );
};

export default StockWatcher;
