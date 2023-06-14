import { IoPersonAddSharp } from "react-icons/io5"
import ButtonWithIcon from "../common/ButtonWithIcon"

export type SendFriendRequestProps = {
  sendFriendRequest: VoidFunction
}
export default function SendFriendRequest(props: SendFriendRequestProps) {
  return (
    <ButtonWithIcon onClick={props.sendFriendRequest}>
      <IoPersonAddSharp />
      <span>Send Friend Request</span>
    </ButtonWithIcon>
  )
}
