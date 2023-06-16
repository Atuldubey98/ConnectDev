import { useState } from "react"
import { useParams } from "react-router-dom"
import FilterComp from "../posts/FilterComp"
import ChatTextFieldSendBtn from "./ChatTextFieldSendBtn"
import ChatsDisplay from "./ChatsDisplay"
import "./ChatsPage.css"
import ChatsScreenHeader from "./ChatsScreenHeader"
export default function ChatsPage() {
  const [openNavChats, setOpenNavChats] = useState<boolean>(false)
  function toggleNavChats() {
    setOpenNavChats(!openNavChats)
  }
  const { chatId: chatIdParams } = useParams()
  const chatId = typeof chatIdParams === "string" ? chatIdParams : ""

  function sendMessage(content: string) {
    if (!chatId) {
      return
    }
    
  }
  return (
    <main>
      <FilterComp />
      <div className="chats__screen">
        <ChatsScreenHeader heading="Chats" toggleNavChats={toggleNavChats} />
        <ChatsDisplay openNavChats={openNavChats} />
        {chatId ? <ChatTextFieldSendBtn sendMessage={sendMessage} /> : null}
      </div>
    </main>
  )
}
