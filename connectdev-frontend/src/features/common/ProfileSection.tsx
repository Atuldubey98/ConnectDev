import { AiFillEdit, AiOutlineArrowDown, AiOutlineLogout } from "react-icons/ai"
import "./ProfileSection.css"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "../../app/hooks"
import { logoutUserAction } from "../login/loginSlice"
import { toast } from "react-toastify"
import { setIdle } from "../posts/postSlice"

export default function ProfileSection({ name }: { name: string }) {
  const navigate = useNavigate()
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
          <AiOutlineArrowDown />
        </div>
        <ul className="profile__dropdownItems">
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
