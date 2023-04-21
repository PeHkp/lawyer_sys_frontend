import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000"
  // baseURL: "https://localhost:5001/api"
  //baseURL: "https://lawyersysbackend-production.up.railway.app/"
});

export default api;