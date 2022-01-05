import React, { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import {login} from '../api/apiRoutes';
import axios from "axios";
const AuthContext = React.createContext();
export const useAuth = () =>{
    return useContext(AuthContext);
}

export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState({});
    const [token, setToken]=useState(localStorage.getItem('REACT_AUTH_TOKEN'));
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(()=>{
        setLoading(true);
        const fetchAuth = ()=>{
            axiosInstance.get('/api/users/current').then(res=>{
                setToken(token);
                setCurrentUser(res.data);
                navigate("/");
            }).catch(err=>{
                navigate("/login");
            })
        }
        if(token)
        {
            fetchAuth();    
        }
        setLoading(false);
    }, [token, navigate])
    const loginUser = (email, password) =>{
        const user = {
            email : email,
            password : password
        }
        axios.post("http://localhost:9000"+login,user).then(res=>{
                setToken(res.data.token);
                localStorage.setItem('REACT_AUTH_TOKEN', res.data.token);
        }).catch(err=>{ 
            console.log(err);
        });
    }

    const logout = () =>{
        axiosInstance.get("/api/users/logout").then(res=>{
            localStorage.clear('REACT_AUTH_TOKEN');
        })
    }
    return (
        <AuthContext.Provider value={{
            token : token,
            currentUser : currentUser,
            loginUser : loginUser,
            logout : logout
        }}>{ !loading && children}
        </AuthContext.Provider>
      )
}
