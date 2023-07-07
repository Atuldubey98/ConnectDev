import { useContext, useEffect, useRef } from "react"
import IUser from "../login/interfaces"
import "./ChatsDisplay.css"
import MessageItem from "./MessageItem"
import SideNavChats from "./SideNavChats"
import { Contact } from "./interface"
import { WebsocketContext } from "../context/WebsocketContext"
import Notfound from "../common/Notfound"
import { MdEnhancedEncryption } from "react-icons/md"
type ChatsDisplayProps = {
  openNavChats: boolean
  contacts: Contact[]
  user: IUser | null
  currentChattingContact: string
  currentContact: Contact | undefined
}
export default function ChatsDisplay(props: ChatsDisplayProps) {
  const messagesResponse = props.currentContact?.messagesResponse
  const dummyElementLiRef = useRef<HTMLLIElement>(null)
  useEffect(() => {
    if (dummyElementLiRef.current) {
      dummyElementLiRef.current.scrollIntoView()
    }
  }, [messagesResponse])
  return (
    <div className="chats__display">
      {props.openNavChats ? (
        <SideNavChats
          contacts={props.contacts}
          user={props.user}
          currentChattingContact={props.currentChattingContact}
        />
      ) : null}
      {messagesResponse ? (
        <ul className="chats">
          {messagesResponse.messages!.map((message) => (
            <MessageItem
              currentUserId={props.user?._id}
              message={message}
              key={message._id}
            />
          ))}
          <li ref={dummyElementLiRef}></li>
        </ul>
      ) : (
        <Notfound
          message="Chats are end to end encrypted"
          icon={MdEnhancedEncryption}
        />
      )}
    </div>
  )
}
