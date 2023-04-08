import axios from "axios";
export const API_URL = import.meta.env.DEV
  ? "http://localhost:9000"
  : import.meta.env.API_URL;
const instance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export default instance;
