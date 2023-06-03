import FilterComp from "../posts/FilterComp"
import ChatTextFieldSendBtn from "./ChatTextFieldSendBtn"
import ChatsDisplay from "./ChatsDisplay"
import "./ChatsPage.css"
import ChatsScreenHeader from "./ChatsScreenHeader"
export default function ChatsPage() {
  return (
    <main>
      <FilterComp />
      <div className="chats__screen">
        <ChatsScreenHeader heading="Chats" />
        <ChatsDisplay />
        <ChatTextFieldSendBtn />
      </div>
    </main>
  )
}
