import "./ChatsDisplay.css"
import SideNavChats from "./SideNavChats"
type ChatsDisplayProps = {
  openNavChats: boolean
}
export default function ChatsDisplay(props: ChatsDisplayProps) {
  return (
    <div className="chats__display">
      {props.openNavChats ? <SideNavChats /> : null}
      <ul className="chats"></ul>
    </div>
  )
}
