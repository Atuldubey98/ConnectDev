import { lazy } from "react";
import { AiOutlineHome } from "react-icons/ai";
import IUser from "../login/interfaces";
import LandingBtn from "./LandingBtn";
import './LandingBtns.css'
const NotLoggedInBtns = lazy(() => import("./NotLoggedInBtns"))
export type LandingBtnsProps = {
    user: IUser | null
}
export default function LandingBtns(props: LandingBtnsProps) {
    const { user } = props;
    return <div className="landing__btns d-flex-center">
        {user ? (
            <LandingBtn to="/posts" lable="Posts" Icon={AiOutlineHome} />

        ) : (
            <NotLoggedInBtns />
        )}
    </div>
}