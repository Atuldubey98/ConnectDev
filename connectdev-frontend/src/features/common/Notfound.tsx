import { IconType } from "react-icons"
import "./Notfound.css"
export type NotfoundProps = {
  icon: IconType
  message: string
}
export default function Notfound(props: NotfoundProps) {
  const { message, icon: Icon } = props
  return (
    <div className="d-flex-center not__found">
      <Icon size={60} color="var(--accent-color)" />
      <h1>{message}</h1>
    </div>
  )
}
