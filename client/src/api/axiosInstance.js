import axios from 'axios';
const axiosInstance = axios.create({
    baseURL : 'http://localhost:9000',
    headers : {
        "Content-Type" : "application/json",
        "Authorization" : localStorage.getItem('REACT_AUTH_TOKEN')
    }
})
export default axiosInstance;