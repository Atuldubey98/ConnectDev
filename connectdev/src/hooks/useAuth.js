import {useEffect, useState} from 'react';
import { current } from '../api/apiRoutes';
import axiosInstance from '../api/axiosInstance';
const useAuth = ()=>{
    const [token, setToken]=useState(localStorage.getItem('REACT_AUTH_TOKEN') || '');
    const [auth, setAuth]=useState();
    useEffect(()=>{
        if(token)
        {
            axiosInstance.get(current).then(res=>{
                localStorage.setItem('REACT_AUTH_TOKEN', token);
                localStorage.setItem('REACT_AUTH_USER', res.data);
                setAuth(true);
                setToken(localStorage.getItem('REACT_AUTH_TOKEN'));
            }).catch((err)=>{
                localStorage.clear();
            })
        }
    },[token])
    return {
        auth
    }
}

export default useAuth;