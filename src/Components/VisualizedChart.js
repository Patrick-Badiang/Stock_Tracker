import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

// Register Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const VisualizedChart = ({ labels, annualRevenues, quarterlyRevenues, unitLabel, color }) => {
    if (!annualRevenues && !quarterlyRevenues) {
        return <p>No revenue data available</p>;
    }

    // console.log("Annual Revenues:", annualRevenues);

    // Prepare labels (years)
    // const labels = annualRevenues.map(entry => entry.frame.slice(2));

    // Prepare datasets
    
    // const quarterlyRevenueValues = quarterlyRevenues.map(entry => entry.val / 1e9);

    const data = {
        labels,
        datasets: [
            {
                label: unitLabel,
                data: annualRevenues,
                backgroundColor: color, // Light teal
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
            },
            // {
            //     label: "Quarterly Revenue (Billion USD)",
            //     data: quarterlyRevenueValues,
            //     backgroundColor: "rgba(255, 99, 132, 0.6)", // Light red
            //     borderColor: "rgba(255, 99, 132, 1)",
            //     borderWidth: 1,
            // },
        ],
    };

    return <Bar data={data} options={{ responsive: true, scales: { y: { beginAtZero: true } } }} />;
};

export default VisualizedChart;
