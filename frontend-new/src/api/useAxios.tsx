import axios from "axios";
export const baseURL: string = import.meta.env.PROD
  ? import.meta.env.BASE_URL
  : "http://localhost:9000";
export const LOGIN_URL: string = "/api/users/login";
function useAxios() {
  const instance = axios.create({
    baseURL,
    withCredentials: true,
  });
  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
  return instance;
}

export default useAxios;
