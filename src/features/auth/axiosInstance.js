// axiosInstance.js
import axios from "axios";

const API = axios.create({
  baseURL: "https://newnetflixbackend.onrender.com",
});

// Automatically attach token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
