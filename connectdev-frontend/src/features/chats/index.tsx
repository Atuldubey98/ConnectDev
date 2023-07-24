import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import socket from "../../socket"
import Container from "../common/Container"
import FilterComp from "../posts/FilterComp"
import ChatTextFieldSendBtn from "./ChatTextFieldSendBtn"
import ChatsDisplay from "./ChatsDisplay"
import "./ChatsPage.css"
import ChatsScreenHeader from "./ChatsScreenHeader"
import {
  loadChatsByContactIdAction,
  loadUserContactsAction,
} from "./chatsSlice"
import { Contact } from "./interface"
export default function ChatsPage() {
  const [openNavChats, setOpenNavChats] = useState<boolean>(false)
  function toggleNavChats() {
    setOpenNavChats(!openNavChats)
  }
  const { user } = useAppSelector((state) => state.login)
  const { contacts } = useAppSelector((state) => state.chats)
  const { chatId: chatIdParams } = useParams()
  const currentChattingContact =
    typeof chatIdParams === "string" ? chatIdParams : ""
  const currentContact: Contact | undefined = (contacts || []).find(
    (contact) => contact._id === currentChattingContact,
  )
  const [page, setPage] = useState<number>(1);
  const appDispatch = useAppDispatch()
  useEffect(() => {
    appDispatch(loadUserContactsAction())
  }, [])
  useEffect(() => {
    if (currentChattingContact) {
      appDispatch(loadChatsByContactIdAction(currentChattingContact, page))
      setOpenNavChats(false)
    }
  }, [currentChattingContact, page])
  function sendMessage(content: string) {
    if (!currentChattingContact) {
      return
    }
    socket.emit("message:send", { content, contactId: currentChattingContact })
  }
  const onIncrementPage = () => {
    setPage(p => p + 1);
  }
  return (
    <Container>
      <main className="chat__screen">
        <FilterComp />
        <div className="chats__screen">
          {currentContact ? (
            <ChatsScreenHeader
              heading={
                currentContact.isGroup
                  ? currentContact.name || ""
                  : currentContact.members?.find(
                    (member) => member._id !== user?._id,
                  )?.name || ""
              }
              toggleNavChats={toggleNavChats}
            />
          ) : (
            <ChatsScreenHeader
              heading={"Chats"}
              toggleNavChats={toggleNavChats}
            />
          )}
          <ChatsDisplay
            onIncrementPage={onIncrementPage}
            currentContact={currentContact}
            openNavChats={openNavChats}
            contacts={contacts || []}
            user={user}
            currentChattingContact={currentChattingContact}
          />
          {currentChattingContact ? (
            <ChatTextFieldSendBtn sendMessage={sendMessage} />
          ) : null}
        </div>
      </main>
    </Container>
  )
}
