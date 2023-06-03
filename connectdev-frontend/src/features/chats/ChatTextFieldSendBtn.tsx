import "./ChatTextFieldSendBtn.css"

export default function ChatTextFieldSendBtn() {
  return (
    <form className="chat__textField d-flex-center">
      <textarea name="body" id="body" />
      <button className="btn">Send</button>
    </form>
  )
}
