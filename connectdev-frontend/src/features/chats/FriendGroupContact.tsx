import { useNavigate } from "react-router-dom"
import "./FriendGroupContact.css"
import classNames from "classnames"
export type FriendGroupContactProps = {
  children?: React.ReactNode
  contactId: string
  isSelected: boolean
}
export default function FriendGroupContact(props: FriendGroupContactProps) {
  const navigate = useNavigate()
  function navigateToChat() {
    navigate(`/chats/${props.contactId}`)
  }  
  return (
    <li
      onClick={navigateToChat}
      className={classNames("friend__groupWrapper", {
        contact__selected: props.isSelected,
      })}
    >
      {props.children}
    </li>
  )
}
