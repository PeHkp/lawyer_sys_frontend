import axios from "axios";

const api = axios.create({
  baseURL: "https://lawyersysbackend-production.up.railway.app/",
});

export default api;