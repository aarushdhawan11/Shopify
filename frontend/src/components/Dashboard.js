// Dashboard.js
import React, { useEffect, useState } from "react";
import { fetchDashboard } from "../api/api"; // use api.js
import "../styles/styles.css";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { useNavigate } from "react-router-dom";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [counts, setCounts] = useState({ customers: 0, products: 0, orders: 0 });
  const [topCustomers, setTopCustomers] = useState([]);
  const [ordersTrend, setOrdersTrend] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchDashboard(); // use fetchDashboard from api.js
        if (res.success) {
          setCounts(res.counts);
          setTopCustomers(res.topCustomers);
          const sortedOrders = res.ordersTrend.sort(
            (a, b) => new Date(a.created_at) - new Date(b.created_at)
          );
          setOrdersTrend(sortedOrders);
        }
      } catch (err) {
        console.error("Dashboard fetch error:", err.message);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // token is used in api.js
    navigate("/");
  };

  // Prepare chart data: sum of orders per day
  const ordersByDate = ordersTrend.reduce((acc, order) => {
    const date = new Date(order.created_at).toLocaleDateString();
    acc[date] = (acc[date] || 0) + order.total_price;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(ordersByDate),
    datasets: [
      {
        label: "Orders Revenue ($)",
        data: Object.values(ordersByDate),
        backgroundColor: "#0077ff"
      }
    ]
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>

      <div className="metrics">
        <div className="metric-box">Customers: {counts.customers}</div>
        <div className="metric-box">Products: {counts.products}</div>
        <div className="metric-box">Orders: {counts.orders}</div>
      </div>

      <div className="chart-container">
        <h3>Orders Trend</h3>
        <Bar data={chartData} />
      </div>

      <div className="top-customers">
        <h3>Top Customers</h3>
        <ul>
          {topCustomers.map((c) => (
            <li key={c.email}>
              {c.email} - ${c.total.toFixed(2)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
