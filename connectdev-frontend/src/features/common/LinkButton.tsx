import "./LinkButton.css"
import { Link } from "react-router-dom"
type LinkButtonProps = {
  children?: React.ReactNode
  to: string
  label: string
}
export default function LinkButton({ children, to, label }: LinkButtonProps) {
  return (
    <Link className="link__btn d-flex-center" to={to}>
      {children}
      {label}
    </Link>
  )
}
