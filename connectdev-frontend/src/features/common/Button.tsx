import "./Button.css"
type ButtonProps = {
  label: string
  disabled?: boolean
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}
export default function Button({ label, onClick, disabled }: ButtonProps) {
  return (
    <button className="primary__btn" disabled={disabled} onClick={onClick}>
      {label}
    </button>
  )
}
