import { TiTickOutline } from "react-icons/ti"
import ButtonWithIcon from "../common/ButtonWithIcon"
type AcceptFriendRequestProps = {
  acceptFriendRequest: VoidFunction
}
export default function AcceptFriendRequest(props: AcceptFriendRequestProps) {
  return (
    <ButtonWithIcon onClick={props.acceptFriendRequest}>
      <TiTickOutline />
      <span>Accept Friend Request</span>
    </ButtonWithIcon>
  )
}
