import moment from "moment"
import ActiveStatus from "../common/ActiveStatus"
import IUser from "../login/interfaces"
import { UserAvatarSmall } from "../posts/CreatePost"
import "./FriendContact.css"
import { Member } from "./interface"
export type FriendContactProps = {
  members: Member[]
  messages: []
  currentUser: IUser | null
}
export default function FriendContact(props: FriendContactProps) {
  const { members, currentUser } = props
  const friendContact: Member | undefined = members.find(
    (memeber) => memeber._id !== currentUser?._id,
  )
  return (
    <div className="friend__contact">
      <UserAvatarSmall
        name={friendContact?.name || ""}
        avatar={friendContact?.avatar}
        size={40}
      />
      <div className="friend__contactDescription">
        <h5>{friendContact?.name}</h5>
        {friendContact?.isActiveNow ? (
          <p>
            Active now <ActiveStatus isActiveNow={friendContact.isActiveNow} />
          </p>
        ) : (
          <p>{moment(friendContact?.lastActive).fromNow()}</p>
        )}
      </div>
    </div>
  )
}
