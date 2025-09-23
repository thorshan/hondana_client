import axios from "axios";

// Base axios instance
const api = axios.create({
  baseURL: "https://hondana.onrender.com/api", // your backend API base URL
  headers: { "Content-Type": "application/json" },
});

// Optional: Add auth token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
