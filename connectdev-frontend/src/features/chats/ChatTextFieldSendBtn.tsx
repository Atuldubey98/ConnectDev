import { ChangeEventHandler, useRef, useState } from "react"
import { AiOutlineSend } from "react-icons/ai"
import "./ChatTextFieldSendBtn.css"
type ChatTextFieldSendBtnProps = {
  sendMessage: (content: string) => void
}
export default function ChatTextFieldSendBtn(props: ChatTextFieldSendBtnProps) {
  const [content, setContent] = useState<string>("");
  const formRef = useRef<HTMLFormElement | null>(null);
  const onKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === "Enter" && e.shiftKey === false) {
      e.preventDefault()
      if (formRef.current) {
        formRef.current.requestSubmit()
      }
    }
  }
  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    props.sendMessage(content)
    setContent("")
  }
  const onChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setContent(e.currentTarget.value)
  }
  return (
    <form onSubmit={onSubmit} ref={formRef} className="chat__textField d-flex-center">
      <textarea
        name="content"
        onKeyDown={onKeyDown}
        id="content"
        minLength={1}
        value={content}
        onChange={onChange}
      />
      <button className="btn d-flex-center">
        <span>Send</span> <AiOutlineSend size={22} />
      </button>
    </form>
  )
}
