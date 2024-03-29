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
      <Icon size={60} color="var(--secondary-color)" />
      <h2>{message}</h2>
    </div>
  )
}
