import React from "react"
import './InputWithError.css'
interface InputWithErrorProps {
  input: React.ReactNode
  error: string
}
export default function InputWithError({ input, error }: InputWithErrorProps) {
  return (
    <div className="input__error">
      {input}
      {error.length === 0 ? null : <p className="input__errMsg">{error}</p>}
    </div>
  )
}
