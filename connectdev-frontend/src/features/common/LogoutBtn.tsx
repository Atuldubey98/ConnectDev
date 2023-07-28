import { useContext } from "react"
import { AiOutlineLogout } from "react-icons/ai"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "../../app/hooks"
import { WebsocketContext } from "../context/WebsocketContext"
import { logoutUserAction } from "../login/loginSlice"
import { setIdle } from "../posts/postSlice"
import useUserToast from "./useUserToast"

const LogoutBtn = () => {
    const appDispatch = useAppDispatch()
    const navigate = useNavigate()
    const { showToast } = useUserToast();
    const socketContext = useContext(WebsocketContext)
    const disconnectFromServer: VoidFunction | null = socketContext
        ? socketContext.disconnectFromServer
        : null;
    function onLogout() {
        if (confirm("Do you want to logout ?")) {
            appDispatch(logoutUserAction(showToast, navigateToHome))
            appDispatch(setIdle())
            if (disconnectFromServer) {
                disconnectFromServer()
            }
        }
    }
    function navigateToHome() {
        navigate("/", { replace: true })
    }

    return <li onClick={onLogout} className="d-flex-center">
        <AiOutlineLogout />
        <span>Logout</span>
    </li>
}
export default LogoutBtn;