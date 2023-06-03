import axios from "axios";

const api = axios.create({
  // baseURL: "https://lawyersysbackend-production.up.railway.app/",
  //baseURL:"https://localhost:5001/api"
  baseURL: "http://localhost:3030/",
});

export default api;