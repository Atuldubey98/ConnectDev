import { AiFillEdit, AiOutlineLogout } from "react-icons/ai"
import { CgProfile } from "react-icons/cg"

import { FaUserFriends } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { logoutUserAction } from "../login/loginSlice"
import { setIdle } from "../posts/postSlice"
import ActiveStatus from "./ActiveStatus"
import "./ProfileSection.css"
import { useContext } from "react"
import { WebsocketContext } from "../context/WebsocketContext"

export default function ProfileSection({ name }: { name: string }) {
  const navigate = useNavigate()
  const { connected } = useAppSelector((state) => state.chats)
  const socketContext = useContext(WebsocketContext)
  const disconnectFromServer: VoidFunction | null = socketContext
    ? socketContext.disconnectFromServer
    : null
  const appDispatch = useAppDispatch()
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
  function showToast(message: string) {
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    })
  }

  return (
    <div className="profile__section">
      <div className="profile__dropwrapper">
        <div className="profile__dropbtn d-flex-center">
          <p>{name}</p>
          <ActiveStatus isActiveNow={connected} />
        </div>
        <ul className="profile__dropdownItems">
          <li onClick={() => navigate("/friends")} className="d-flex-center">
            <FaUserFriends />
            <span>Friends</span>
          </li>
          <li onClick={() => navigate("/profile")} className="d-flex-center">
            <CgProfile />
            <span>Profile</span>
          </li>
          <li
            onClick={() => navigate("/profile/edit")}
            className="d-flex-center"
          >
            <AiFillEdit />
            <span>Edit Profile</span>
          </li>
          <li onClick={onLogout} className="d-flex-center">
            <AiOutlineLogout />
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
