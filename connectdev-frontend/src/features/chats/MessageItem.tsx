import classNames from "classnames"
import { UserAvatarSmall } from "../posts/CreatePost"
import "./MessageItem.css"
import { Message } from "./interface"
import { LegacyRef, forwardRef } from "react"
export type MessageItemProps = {
  message: Message
  currentUserId: string | undefined
}

const MessageItem = forwardRef((props : MessageItemProps, ref: LegacyRef<HTMLLIElement>)=>{
  const { message } = props
  const isCurrentUserMessage = message.sender._id === props.currentUserId
  return (
    <li className="message__item">
      <div
        className={classNames("message", { message__me: isCurrentUserMessage })}
      >
        <div className="message__avatar">
          <UserAvatarSmall
            avatar={message.sender.avatar}
            name={message.sender.name}
            size={25}
          />
        </div>
        <div className="message__content">
          <p>{message.content}</p>
        </div>
      </div>
    </li>
  )
})
export default MessageItem