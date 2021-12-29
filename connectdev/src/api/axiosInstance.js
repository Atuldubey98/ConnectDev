import axios from 'axios';
const getAuthHeaders = ()=>{
    const token = localStorage.getItem('REACT_AUTH_TOKEN');
    if(token)
    {
        return {
            'Content-Type' : 'application/json',
            'Authorization' : token
        }
    }
    return {
        'Content-Type' : 'application/json',
    }
}
const authFetch = {
    baseURL : 'http://localhost:9000/api',
    headers : getAuthHeaders()
}


const axiosInstance = axios.create(authFetch);

export default axiosInstance;