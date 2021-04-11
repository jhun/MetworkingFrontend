import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.15.6:8081",
});

export const apiMatch = axios.create({
  baseURL: "http://192.168.15.6:8082",
});

export const apiGeo = axios.create({
  baseURL: "http://192.168.15.6:8083",
});

export default api;
