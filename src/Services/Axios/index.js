import axios from "axios";

const api = axios.create({
  baseURL: "http://metworking-env.eba-ueztaznm.us-east-1.elasticbeanstalk.com",
});

export const apiMatch = axios.create({
  baseURL:
    "http://metworking-env.eba-ueztaznm.us-east-1.elasticbeanstalk.com:81",
});

export const apiGeo = axios.create({
  baseURL:
    "http://metworking-env.eba-ueztaznm.us-east-1.elasticbeanstalk.com:82",
});

export default api;
