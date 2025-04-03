import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const RevenueChart = ({ revenueData }) => {
  // Extract only 10-K (annual revenue) data
  const annualRevenues = revenueData.units.USD.filter((entry) => entry.form === "10-K" && entry.frame && !entry.frame.includes("Q"));

  // Sort by year (frame = CYYYYY)
  annualRevenues.sort((a, b) => parseInt(a.frame.slice(2)) - parseInt(b.frame.slice(2)));

  // Prepare labels (years) and dataset (revenues)
  const labels = annualRevenues.map(entry => entry.frame.slice(2)); // Extracts "YYYY" from "CYYYYY"
  const revenueValues = annualRevenues.map(entry => entry.val / 1e9); // Convert to billions

  const data = {
    labels,
    datasets: [
      {
        label: "Annual Revenue (in Billion USD)",
        data: revenueValues,
        backgroundColor: "rgba(75, 192, 192, 0.6)", // Light teal bars
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Revenue (Billion USD)",
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default RevenueChart;
