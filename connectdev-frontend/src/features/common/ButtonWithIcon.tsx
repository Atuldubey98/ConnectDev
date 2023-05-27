import React from "react"
import "./ButtonWithIcon.css"
type ButtonWithIconProps = {
  children?: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}
export default function ButtonWithIcon({
  children,
  onClick,
}: ButtonWithIconProps) {
  return (
    <button
      onClick={onClick}
      className="btn btn__icon cursor__pointer d-flex-center"
    >
      {children}
    </button>
  )
}
