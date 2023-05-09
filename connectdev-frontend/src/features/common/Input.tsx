import { FC, InputHTMLAttributes } from "react"
import "./Input.css"
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label: string
}

const Input: FC<InputProps> = ({ ...input }) => {
  return (
    <div className="input__control">
      <label htmlFor={input.name}>{input.label}</label>
      <input {...input} />
    </div>
  )
}

export default Input
