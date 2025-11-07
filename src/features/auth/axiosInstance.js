import axios from "axios";

const API = axios.create({
  baseURL: "https://newnetflixbackend.onrender.com",
});

export default API;
