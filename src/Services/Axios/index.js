import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.15.13:5000",
});

export const apiMatch = axios.create({
  baseURL: "http://192.168.15.13:5002",
});

export default api;
