import axios, { isAxiosError } from "axios"
export const baseURL = import.meta.env.DEV
  ? "http://192.168.1.15:9000"
  : import.meta.env.VITE_API_URL
const instance = axios.create({
  baseURL,
  withCredentials: true,
})

instance.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    const check = isAxiosError(error)
      ? error.response?.status === 401 || error.response?.status === 403
      : false
    if (window.location.pathname !== "/login" && check) {
      window.location.href = "/login"
    }
    return Promise.reject(error)
  },
)
export default instance
