import { ImCancelCircle } from "react-icons/im"
import ButtonWithIcon from "../common/ButtonWithIcon"
export type CancelRequestProps = {
  cancelFriendRequest: VoidFunction
}
export default function CancelRequest(props: CancelRequestProps) {
  return (
    <ButtonWithIcon onClick={props.cancelFriendRequest}>
      <ImCancelCircle />
      <span>Cancel Request</span>
    </ButtonWithIcon>
  )
}
