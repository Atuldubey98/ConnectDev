import { AiFillEdit } from "react-icons/ai"
import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import socket from "../../socket"
import LinkButton from "../common/LinkButton"
import AcceptFriendRequest from "./AcceptFriendRequest"
import AlreadyFriends from "./AlreadyFriends"
import CancelRequest from "./CancelRequest"
import SendFriendRequest from "./SendFriendRequest"
import { FriendRequest } from "./interfaces"
import {
  acceptFriendRequestAction,
  cancelFriendRequestAction,
  sendFriendRequestAction,
} from "./profileSlice"

export type FriendRequestWrapperProps = {
  friendRequest: FriendRequest | null
  friendUserId: string
}
export default function FriendRequestWrapper(props: FriendRequestWrapperProps) {
  const { friendRequest } = props
  const { user } = useAppSelector((state) => state.login)
  const isFriendRequestSentByCurrentUser =
    friendRequest?.status === "requested" &&
    friendRequest.requestor === user?._id
  const areUsersFriends = friendRequest?.status === "accepted"

  const appDispatch = useAppDispatch()
  const sendFriendRequest = () => {
    appDispatch(
      sendFriendRequestAction(
        props.friendUserId,
        sendNotificationForFriendRequestSent,
      ),
    )
  }
  function sendNotificationForFriendRequestSent(friendRequestId: string) {
    socket.emit("friendRequest:send", friendRequestId)
  }
  const cancelFriendRequest = () => {
    appDispatch(cancelFriendRequestAction(friendRequest?._id || "", cancelFriendRequestSendNotificaition))
  }
  const acceptFriendRequest = () => {
    appDispatch(acceptFriendRequestAction(friendRequest?._id || ""))
  }
  function cancelFriendRequestSendNotificaition() {
    socket.emit("friendRequest:cancel", friendRequest)
  }
  const { userId } = useParams()

  return friendRequest ? (
    <div className="d-flex-center">
      {isFriendRequestSentByCurrentUser ? (
        <CancelRequest cancelFriendRequest={cancelFriendRequest} />
      ) : areUsersFriends ? null : (
        <AcceptFriendRequest acceptFriendRequest={acceptFriendRequest} />
      )}
      {areUsersFriends ? <AlreadyFriends /> : null}
    </div>
  ) : (
    <div className="d-flex-center">
      <SendFriendRequest sendFriendRequest={sendFriendRequest} />
      
    </div>
  )
}
