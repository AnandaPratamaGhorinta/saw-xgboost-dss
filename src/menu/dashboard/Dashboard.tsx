import React from "react";
import { Bar, Pie, Doughnut, Line } from "react-chartjs-2";
import { createUseStyles } from "react-jss";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const useStyles = createUseStyles({
  dashboard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    background: "#f5f5f5",
    minHeight: "100vh",
  },
  chartRow: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: "1200px",
    margin: "20px 0",
  },
  chartContainer: {
    width: "45%",
    margin: "20px 0",
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
  },
});

const mockData = {
  sales: [
    { month: "Jan", value: 400 },
    { month: "Feb", value: 300 },
    { month: "Mar", value: 500 },
    { month: "Apr", value: 400 },
    { month: "May", value: 300 },
    { month: "Jun", value: 200 },
    { month: "Jul", value: 300 },
    { month: "Aug", value: 400 },
    { month: "Sep", value: 500 },
    { month: "Oct", value: 400 },
    { month: "Nov", value: 300 },
    { month: "Dec", value: 200 },
  ],
  services: [
    { month: "Jan", value: 200 },
    { month: "Feb", value: 300 },
    { month: "Mar", value: 400 },
    { month: "Apr", value: 300 },
    { month: "May", value: 400 },
    { month: "Jun", value: 500 },
    { month: "Jul", value: 600 },
    { month: "Aug", value: 700 },
    { month: "Sep", value: 800 },
    { month: "Oct", value: 900 },
    { month: "Nov", value: 1000 },
    { month: "Dec", value: 1100 },
  ],
};

const Dashboard: React.FC = () => {
  const classes = useStyles();

  const salesData = {
    labels: mockData.sales.map((data) => data.month),
    datasets: [
      {
        label: "Sales",
        data: mockData.sales.map((data) => data.value),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
        ],
      },
    ],
  };

  const servicesData = {
    labels: mockData.services.map((data) => data.month),
    datasets: [
      {
        label: "Services",
        data: mockData.services.map((data) => data.value),
        backgroundColor: "#82ca9d",
      },
    ],
  };

  return (
    <>
      <h2>Dashboard</h2>
      <div className={classes.dashboard}>
        <div className={classes.chartRow}>
          <div className={classes.chartContainer}>
            <h2>Sales Data</h2>
            <Pie data={salesData} />
          </div>
          <div className={classes.chartContainer}>
            <h2>Services Data</h2>
            <Bar data={servicesData} />
          </div>
        </div>
        <div className={classes.chartRow}>
          <div className={classes.chartContainer}>
            <h2>Sales Data</h2>
            <Line data={salesData} />
          </div>
          <div className={classes.chartContainer}>
            <h2>Services Data</h2>
            <Doughnut data={salesData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
