import { MdEnhancedEncryption } from "react-icons/md"
import Notfound from "../common/Notfound"
import IUser from "../login/interfaces"
import ChatMessagesList from "./ChatMessagesList"
import "./ChatsDisplay.css"
import LoadMoreBtn from "./LoadMoreBtn"
import SideNavChats from "./SideNavChats"
import { Contact } from "./interface"
type ChatsDisplayProps = {
  openNavChats: boolean
  contacts: Contact[]
  user: IUser | null
  onIncrementPage: VoidFunction;
  currentChattingContact: string
  currentContact: Contact | undefined
}
export default function ChatsDisplay(props: ChatsDisplayProps) {
  const messagesResponse = props.currentContact?.messagesResponse

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
        <div className="chats__wrapper">
          <LoadMoreBtn onIncrementPage={props.onIncrementPage} hasNextPage={messagesResponse.hasNextPage} />
          <ChatMessagesList messages={messagesResponse.messages || []} currentUserId={props.user?._id || ""} />
        </div>
      ) : (
        <Notfound
          message="Chats are end to end encrypted"
          icon={MdEnhancedEncryption}
        />
      )}
    </div>
  )
}
