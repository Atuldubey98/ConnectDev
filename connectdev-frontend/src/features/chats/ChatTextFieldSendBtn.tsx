import { ChangeEventHandler, useState } from "react"
import "./ChatTextFieldSendBtn.css"
type ChatTextFieldSendBtnProps = {
  sendMessage: (content: string) => void
}
export default function ChatTextFieldSendBtn(props: ChatTextFieldSendBtnProps) {
  const [content, setContent] = useState<string>("")
  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    props.sendMessage(content)
  }
  const onChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setContent(e.currentTarget.value)
  }
  return (
    <form onSubmit={onSubmit} className="chat__textField d-flex-center">
      <textarea
        name="content"
        id="content"
        value={content}
        onChange={onChange}
      />
      <button className="btn">Send</button>
    </form>
  )
}
