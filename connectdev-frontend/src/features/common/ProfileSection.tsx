
import { useAppSelector } from "../../app/hooks"
import ActiveStatus from "./ActiveStatus"
import ProfileDropDownBtnsList from "./ProfileDropDownBtnsList"
import "./ProfileSection.css"

export default function ProfileSection({ name }: { name: string }) {
  const connected = useAppSelector((state) => state.chats.connected)

  return (
    <div className="profile__section">
      <div className="profile__dropwrapper">
        <div className="profile__dropbtn d-flex-center">
          <p>{name}</p>
          <ActiveStatus isActiveNow={connected} />
        </div>
        <ProfileDropDownBtnsList />
      </div>
    </div>
  )
}
