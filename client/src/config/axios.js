import axios from "axios";

// Get the API base URL from environment variable or use proxy in development
const API_URL = process.env.REACT_APP_API_URL || "";

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const auth = localStorage.getItem("auth");
    if (auth) {
      const parseData = JSON.parse(auth);
      if (parseData.token) {
        config.headers.Authorization = parseData.token;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;

