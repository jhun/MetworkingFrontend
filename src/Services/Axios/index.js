import axios from "axios";

const api = axios.create({
  baseURL:
    "http://metworking-env.eba-drmcderk.us-east-1.elasticbeanstalk.com:81",
});

export const apiMatch = axios.create({
  baseURL:
    "http://metworking-env.eba-drmcderk.us-east-1.elasticbeanstalk.com:82",
});

export const apiGeo = axios.create({
  baseURL:
    "http://metworking-env.eba-drmcderk.us-east-1.elasticbeanstalk.com:83",
});

export default api;
