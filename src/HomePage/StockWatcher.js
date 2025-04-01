import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { usePortfolio } from "../Context/PortfolioContext";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StockWatcher = ({ unit = "$" }) => {
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
  // const { stockData } = portfolioData.stock; // Access global portfolio data

  // if (!stockData) {
  //   return (
  //     <div className="p-4 bg-white shadow-lg rounded-lg w-full max-w-lg" style={{ height: "100%" }}>
  //       <h2 className="text-xl font-bold mb-4">No stock data available</h2>
  //     </div>
  //   );
  // }
  
  const data = {
    labels: portfolioData.stock.map((stock) => stock.symbol),
    datasets: [
      {
        label: `TTM Price Change (${unit})`,
        data: portfolioData.stock.map((stock) => (stock.current_price || 0) - (stock.bought_price || 0)),
        backgroundColor: portfolioData.stock.map((stock) => (stock.current_price || 0) - (stock.bought_price || 0) < 0 ? "#FF4C4C" : "#4CAF50"),
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
      <Bar data={data} options={options} />
    </div>
  );
};

export default StockWatcher;
