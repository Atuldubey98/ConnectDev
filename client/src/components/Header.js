import { useAuth } from "../context/AuthContext";

const Header = () =>{
    const {logout} = useAuth();
    return <button onClick={()=>{
        logout();
    }}>Logout</button>
}

export default Header;