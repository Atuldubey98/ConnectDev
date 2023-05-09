import "./ProfileSection.css"
import { AiFillEdit, AiOutlineArrowDown, AiOutlineLogout } from "react-icons/ai"

export default function ProfileSection({ name }: { name: string }) {
  return (
    <div className="profile__section">
      <div className="profile__dropwrapper">
        <div className="profile__dropbtn d-flex-center">
          <p>{name}</p>
          <AiOutlineArrowDown />
        </div>
        <ul className="profile__dropdownItems">
          <li className="d-flex-center">
            <AiFillEdit />
            <span>Edit Profile</span>
          </li>
          <li className="d-flex-center">
            <AiOutlineLogout />
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
