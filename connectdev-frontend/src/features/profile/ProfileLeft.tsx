import classNames from "classnames"
import { UserAvatarSmall } from "../posts/CreatePost"
import { IUserDetails } from "../posts/interfaces"
import "./ProfileLeft.css"
type ProfileLeftProps = {
  status: string
  user: IUserDetails | null
  onAvatarClick: VoidFunction
  isCurrentUserSameForProfile: boolean
  children?: React.ReactNode
}
export default function ProfileLeft({
  status,
  user,
  onAvatarClick,
  isCurrentUserSameForProfile,
  children,
}: ProfileLeftProps) {
  return (
    <section className="profile__left">
      <div
        onClick={onAvatarClick}
        className={classNames("profile__editWrapper d-flex-center", {
          cursor__pointer: isCurrentUserSameForProfile,
        })}
      >
        <UserAvatarSmall
          size={200}
          avatar={user?.avatar}
          name={user?.name || ""}
        />
      </div>
      <h2>{user?.name}</h2>
      <p className="profile__email">{user?.email}</p>
      <p className="profile__status">{status}</p>
      {children}
    </section>
  )
}
