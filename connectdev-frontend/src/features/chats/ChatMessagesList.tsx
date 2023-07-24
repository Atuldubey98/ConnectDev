import { useRef, useEffect } from "react";
import MessageItem from "./MessageItem";
import { Message } from "./interface"

export type ChatMessagesListProps = {
    messages: Message[]
    currentUserId: string;
}
export default function ChatMessagesList(props: ChatMessagesListProps) {
    const { messages, currentUserId } = props;
    const dummyElementLiRef = useRef<HTMLLIElement>(null)
    useEffect(() => {
        if (dummyElementLiRef.current) {
            dummyElementLiRef.current.scrollIntoView()
        }
        
    }, [currentUserId])
    return <ul className="chats">
        {messages!.map((message) => (
            <MessageItem
                currentUserId={currentUserId}
                message={message}
                key={message._id}
            />
        ))}
        <li ref={dummyElementLiRef}></li>
    </ul>
}
