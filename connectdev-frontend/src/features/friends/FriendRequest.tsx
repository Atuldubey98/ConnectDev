import { AiOutlineSend } from "react-icons/ai"
import ActiveStatus from "../common/ActiveStatus"
import ButtonWithIcon from "../common/ButtonWithIcon"
import UserFriendDetail from "../notifications/UserFriendDetail"
import { Friend } from "./friendsSlice"

export default function FriendRequest({
  friend,
  onMessageClick,
}: {
  friend: Friend
  onMessageClick: (friend: Friend) => void
}): JSX.Element {
  return (
    <li key={friend._id} className="friend__request">
      <div className=" friend__active">
        <ActiveStatus isActiveNow={friend.isActiveNow} />
        <UserFriendDetail key={friend._id} user={friend} />
      </div>
      <ButtonWithIcon onClick={() => onMessageClick(friend)}>
        <span>Message</span>
        <AiOutlineSend />
      </ButtonWithIcon>
    </li>
  )
}
