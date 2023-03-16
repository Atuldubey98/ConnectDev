import axios from "axios";
export const API_URL = "http://localhost:9000";
const instance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});
instance.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {
    if (error.response.data.status === 401) {
      window.location.pathname = "/login";
    }
    return Promise.reject(error);
  }
);

export default instance;
