import { AiOutlineMenu } from "react-icons/ai"
import "./ChatsScreenHeader.css"
type ChatsScreenHeaderProps = {
  heading: string
  toggleNavChats: VoidFunction
}
export default function ChatsScreenHeader(props: ChatsScreenHeaderProps) {
  const { heading } = props
  return (
    <section className="chats__screenHeader">
      <AiOutlineMenu
        onClick={props.toggleNavChats}
        className="cursor-pointer"
        color="white"
      />
      <h3>{heading} </h3>
    </section>
  )
}
