import { TiTickOutline } from "react-icons/ti"
import { TfiClose } from "react-icons/tfi"

import ButtonWithIcon from "../common/ButtonWithIcon"
export type FriendRequestBtnsProps = {
  onAcceptFriendRequest: () => void
  onCancelFriendRequest: () => void
}
export default function FriendRequestBtns(props: FriendRequestBtnsProps) {
  return (
    <div className="friend__requestBtns">
      <ButtonWithIcon onClick={props.onAcceptFriendRequest}>
        <TiTickOutline color="green" />
        <span>Accept</span>
      </ButtonWithIcon>
      <ButtonWithIcon onClick={props.onCancelFriendRequest}>
        <TfiClose color="red" />
        <span>Deny</span>
      </ButtonWithIcon>
    </div>
  )
}
