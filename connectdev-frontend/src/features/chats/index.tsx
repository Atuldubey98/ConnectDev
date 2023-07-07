import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import FilterComp from "../posts/FilterComp"
import ChatTextFieldSendBtn from "./ChatTextFieldSendBtn"
import ChatsDisplay from "./ChatsDisplay"
import "./ChatsPage.css"
import ChatsScreenHeader from "./ChatsScreenHeader"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  loadChatsByContactIdAction,
  loadUserContactsAction,
} from "./chatsSlice"
import socket from "../../socket"
export default function ChatsPage() {
  const [openNavChats, setOpenNavChats] = useState<boolean>(false)
  function toggleNavChats() {
    setOpenNavChats(!openNavChats)
  }
  const { user } = useAppSelector((state) => state.login)
  const { chatId: chatIdParams } = useParams()
  const { contacts } = useAppSelector((state) => state.chats)
  const currentChattingContact =
    typeof chatIdParams === "string" ? chatIdParams : ""

  const appDispatch = useAppDispatch()
  useEffect(() => {
    appDispatch(loadUserContactsAction())
  }, [])
  useEffect(() => {
    if (currentChattingContact) {
      appDispatch(loadChatsByContactIdAction(currentChattingContact))
      setOpenNavChats(false)
    }
  }, [currentChattingContact])
  function sendMessage(content: string) {
    if (!currentChattingContact) {
      return
    }
    socket.emit("message:send", { content, contactId: currentChattingContact })
  }
  return (
    <main className="chat__screen">
      <FilterComp />
      <div className="chats__screen">
        <ChatsScreenHeader heading="Chats" toggleNavChats={toggleNavChats} />
        <ChatsDisplay
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
  )
}
