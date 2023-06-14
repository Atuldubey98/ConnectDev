import { Link } from "react-router-dom"
import { UserAvatarSmall } from "../posts/CreatePost"
import { FriendRequestEntity } from "../profile/interfaces"
import "./FriendRequestAcceptDeny.css"
import FriendRequestBtns from "./FriendRequestBtns"
import { useAppDispatch } from "../../app/hooks"
import {
  acceptFriendRequestNotificationAction,
  cancelFriendRequestNotificationAction,
} from "./notificationSlice"
export type FriendRequestAcceptDenyProps = {
  request: FriendRequestEntity
}
export default function FriendRequestAcceptDeny(
  props: FriendRequestAcceptDenyProps,
) {
  const { request } = props
  const { requestor } = request
  const appDispatch = useAppDispatch()
  const onAcceptFriendRequest = () => {
    appDispatch(acceptFriendRequestNotificationAction(request._id))
  }
  const onCancelFriendRequest = () => {
    appDispatch(cancelFriendRequestNotificationAction(request._id))
  }
  return (
    <li className="friend__request">
      <UserAvatarSmall
        name={requestor.name}
        avatar={requestor.avatar}
        size={40}
      />
      <div className="friend__requestAbout">
        <Link to={`/profile/${requestor._id}`}>
          <p>{requestor.name}</p>
        </Link>
        <p>{requestor.email}</p>
      </div>
      <FriendRequestBtns
        onCancelFriendRequest={onCancelFriendRequest}
        onAcceptFriendRequest={onAcceptFriendRequest}
      />
    </li>
  )
}
