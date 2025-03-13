import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StockWatcher = ({ unit = "$" }) => {
  // Simulated stock TTM price changes (negative values indicate below usual levels)
  const stockData = [
    { name: "Company A", change: -12 },
    { name: "Company B", change: -8 },
    { name: "Company C", change: -15 },
    { name: "Company D", change: 6 },
    { name: "Company E", change: -10 },
  ];

  const data = {
    labels: stockData.map((stock) => stock.name),
    datasets: [
      {
        label: `TTM Price Change (${unit})`,
        data: stockData.map((stock) => stock.change),
        backgroundColor: stockData.map((stock) => stock.change < 0 ? "#FF4C4C" : "#4CAF50"),
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
    <div className="p-4 bg-white shadow-lg rounded-lg w-full max-w-lg" style={{ height: "390px" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default StockWatcher;
