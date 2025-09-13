import axios from "axios";

const API_URL = "http://localhost:5000/api";

// Create Axios instance
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // send cookies/session automatically
});

// Attach token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Register
export const registerUser = async (email, password) => {
  const response = await api.post("/auth/register", { email, password });
  return response.data;
};

// Login
export const loginUser = async (email, password) => {
  const response = await api.post("/auth/login", { email, password });
  return response.data;
};

// Fetch data
export const fetchProducts = async () => {
  const response = await api.get("/products");
  return response.data;
};

export const fetchCustomers = async () => {
  const response = await api.get("/customers");
  return response.data;
};

export const fetchOrders = async () => {
  const response = await api.get("/orders");
  return response.data;
};

// Fetch dashboard stats (aggregated)
export const fetchDashboard = async (start = null, end = null) => {
  const params = {};
  if (start) params.start = start;
  if (end) params.end = end;

  const response = await api.get("/dashboard", { params });
  return response.data;
};
