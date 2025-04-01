import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const CAGRChart = ({ dataPoints }) => {
  const data = {
    labels: dataPoints.map((point) => point.year),
    datasets: [
      {
        label: "CAGR (%)",
        data: dataPoints.map((point) => point.cagr),
        borderColor: "#4CAF50",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          callback: function (value) {
            return value + "%";
          },
        },
      },
    },
  };

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg w-full max-w-lg" style={{ maxHeight: "330px" }}>
      <h2 className="text-xl font-bold mb-4">Stock Portfolio CAGR</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default CAGRChart;