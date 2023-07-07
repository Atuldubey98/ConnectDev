import { useContext, useEffect, useRef } from "react"
import IUser from "../login/interfaces"
import "./ChatsDisplay.css"
import MessageItem from "./MessageItem"
import SideNavChats from "./SideNavChats"
import { Contact } from "./interface"
import { WebsocketContext } from "../context/WebsocketContext"
type ChatsDisplayProps = {
  openNavChats: boolean
  contacts: Contact[]
  user: IUser | null
  currentChattingContact: string
}
export default function ChatsDisplay(props: ChatsDisplayProps) {
  const currentContact: Contact | undefined = props.contacts.find(
    (contact) => contact._id === props.currentChattingContact,
  )
  const messagesResponse = currentContact?.messagesResponse
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
      <ul className="chats">
        {messagesResponse
          ? messagesResponse.messages!.map((message) => (
              <MessageItem
                currentUserId={props.user?._id}
                message={message}
                key={message._id}
              />
            ))
          : null}
        <li ref={dummyElementLiRef}></li>
      </ul>
    </div>
  )
}
