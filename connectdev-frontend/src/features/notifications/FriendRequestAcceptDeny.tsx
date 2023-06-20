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
import UserFriendDetail from "./UserFriendDetail"
import socket from "../../socket"
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
    appDispatch(
      acceptFriendRequestNotificationAction(
        request._id,
        sendFriendRequestAcceptedNotification,
      ),
    )
  }
  const onCancelFriendRequest = () => {
    appDispatch(cancelFriendRequestNotificationAction(request._id))
  }
  function sendFriendRequestAcceptedNotification(
    acceptedRequest: FriendRequestEntity,
  ) {
    socket.emit("friendRequest:accept", acceptedRequest)
  }
  return (
    <li className="friend__request">
      <UserFriendDetail user={requestor} />
      <FriendRequestBtns
        onCancelFriendRequest={onCancelFriendRequest}
        onAcceptFriendRequest={onAcceptFriendRequest}
      />
    </li>
  )
}
