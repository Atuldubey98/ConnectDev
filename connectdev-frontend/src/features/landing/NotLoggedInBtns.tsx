import { BiUserPlus } from "react-icons/bi";
import LandingBtn from "./LandingBtn";
import { SlLogin } from "react-icons/sl";

export default function NotLoggedInBtns() {
    return <>
        <LandingBtn to="/login" lable="Login" Icon={SlLogin} />
        <LandingBtn to="/register" lable="Register" Icon={BiUserPlus} />
    </>
}