import { BsChatSquareDots } from "react-icons/bs"
import Notfound from "../common/Notfound"
import IUser from "../login/interfaces"
import FriendContact from "./FriendContact"
import FriendGroupContact from "./FriendGroupContact"
import GroupContact from "./GroupContact"
import "./SideNavChats.css"
import { Contact } from "./interface"
export type SideNavChatsProps = {
  contacts: Contact[]
  currentChattingContact: string
  user: IUser | null
}
export default function SideNavChats(props: SideNavChatsProps) {
  const { contacts, currentChattingContact, user: currentUser } = props

  return (
    <nav className="side__nav">
      {contacts.length === 0 ? <Notfound icon={BsChatSquareDots} message="No chats" /> : <ul className="side__navContacts">
        {contacts.map((contact) => (
          <FriendGroupContact
            isSelected={currentChattingContact === contact._id}
            contactId={contact._id}
            key={contact._id}
          >
            {contact.isGroup ? (
              <GroupContact />
            ) : (
              <FriendContact
                members={contact.members || []}
                messages={[]}
                currentUser={currentUser}
              />
            )}
          </FriendGroupContact>
        ))}
      </ul>}
    </nav>
  )
}
