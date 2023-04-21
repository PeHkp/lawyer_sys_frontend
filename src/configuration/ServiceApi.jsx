import axios from "axios";

const api = axios.create({
  baseURL: "https://lawyersysbackend-production.up.railway.app/",
  // baseURL: "http://localhost:3000/",
});

export default api;