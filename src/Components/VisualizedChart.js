import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

// Register Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const VisualizedChart = ({ revenueData, title, color }) => {
  // Extract only 10-K (annual revenue) data
  if (!revenueData || !revenueData.units || !revenueData.units.USD) {
    return <p>No data available</p>;
  }
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
        backgroundColor: color, // Light teal bars
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

  return (
    <>
      <Grid size={12} mt={2}>
        <Typography variant="h4" sx={{ textAlign: "center", marginBottom: 2 }}>
            {title}
        </Typography>
        <Bar data={data} options={options} />
        </Grid>
    </>
    );
};

export default VisualizedChart;
