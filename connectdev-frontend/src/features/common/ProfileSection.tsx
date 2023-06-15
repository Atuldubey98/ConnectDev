import { AiFillEdit, AiOutlineLogout } from "react-icons/ai"
import { TbCircleDotFilled } from "react-icons/tb"
import { CgProfile } from "react-icons/cg"

import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { logoutUserAction } from "../login/loginSlice"
import { setIdle } from "../posts/postSlice"
import "./ProfileSection.css"
import { FaUserFriends } from "react-icons/fa"

export default function ProfileSection({ name }: { name: string }) {
  const navigate = useNavigate()
  const { connected } = useAppSelector((state) => state.chats)
  const appDispatch = useAppDispatch()
  function onLogout() {
    if (confirm("Do you want to logout ?")) {
      appDispatch(logoutUserAction(showToast, navigateToHome))
      appDispatch(setIdle())
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
          <TbCircleDotFilled color={connected ? "green" : "red"} />
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
