import classNames from "classnames"
import { formatDistanceToNow } from "date-fns"
import { LegacyRef, forwardRef } from "react"
import { UserAvatarSmall } from "../posts/CreatePost"
import "./MessageItem.css"
import { Message } from "./interface"

export type MessageItemProps = {
  message: Message
  currentUserId: string | undefined
}

const MessageItem = forwardRef((props: MessageItemProps, ref: LegacyRef<HTMLLIElement>) => {
  const { message } = props
  const isCurrentUserMessage = message.sender._id === props.currentUserId
  return (
    <li title={formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })} className="message__item">
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