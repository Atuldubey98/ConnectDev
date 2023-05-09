import classNames from "classnames"
import './MessageInfo.css';
type MessageInfoProps = {
  isError: boolean
  message: string
}
export default function MessageInfo({ isError, message }: MessageInfoProps) {
  return (
    <div className={classNames({isError}, 'message__info')}>
      <p>{message}</p>
    </div>
  )
}
