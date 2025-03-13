import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const StockChart = () => {
  const [timeRange, setTimeRange] = useState("1D");
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchData = async () => {
      const generatedData = generateStockData(timeRange);
      setChartData(generatedData);
    };
    fetchData();
  }, [timeRange]);

  const generateStockData = (range) => {
    const now = new Date();
    let labels = [];
    let prices = [];
    let numPoints = 24; // Default to 1-day (hourly data)

    switch (range) {
      case "5D":
        numPoints = 5 * 24; // 5 days, hourly
        break;
      case "1W":
        numPoints = 7 * 24;
        break;
      case "1M":
        numPoints = 30;
        break;
      case "6M":
        numPoints = 6 * 30;
        break;
      case "YTD":
        numPoints = new Date().getMonth() * 30;
        break;
      default:
        numPoints = 24;
    }

    for (let i = numPoints; i >= 0; i-= 2) {
      let date = new Date();
      date.setHours(now.getHours() - i);
      labels.push(date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
      prices.push((Math.random() * 50 + 100).toFixed(2));
    }

    return {
      labels,
      datasets: [
        {
          label: "Stock Price ($)",
          data: prices,
          borderColor: "#4CAF50",
          backgroundColor: "rgba(76, 175, 80, 0.2)",
          tension: 0.1,
        },
      ],
    };
  };

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg" style={{ height: "400px" }}>
      <div className="mb-4">
        {['1D', '5D', '1W', '1M', '6M', 'YTD'].map((range) => (
          <button
            key={range}
            className={`px-3 py-1 m-1 rounded ${timeRange === range ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setTimeRange(range)}
          >
            {range}
          </button>
        ))}
      </div>
      <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
    </div>
  );
};

export default StockChart;