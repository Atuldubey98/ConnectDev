import { Link } from "react-router-dom"
import { ClockLoader } from "react-spinners"
import "./AuthForm.css"
import Button from "./Button"
import Input, { InputProps } from "./Input"
import InputWithError from "./InputWithError"
import MessageInfo from "./MessageInfo"
type AuthFormProps = {
  onSubmit: React.FormEventHandler<HTMLFormElement>
  buttonLabel: string
  loading: boolean
  children?: React.ReactNode
  messageInfo: {
    isError: boolean
    message: string
  }
  link: {
    to: string
    label: string
  }
  state: {
    emailErrTxt: string
    passwordErrTxt: string
  }
  emailProps: InputProps
  passwordProps: InputProps
}
export default function AuthForm({
  onSubmit,
  buttonLabel,
  children,
  loading,
  messageInfo,
  link,
  emailProps,
  passwordProps,
  state,
}: AuthFormProps) {
  const { emailErrTxt, passwordErrTxt } = state
  return (
    <form className="auth__form" onSubmit={onSubmit}>
      <InputWithError input={<Input {...emailProps} />} error={emailErrTxt} />
      <InputWithError
        input={<Input {...passwordProps} />}
        error={passwordErrTxt}
      />
      {children}
      {messageInfo.message.length > 0 ? (
        <MessageInfo
          isError={messageInfo.isError}
          message={messageInfo.message}
        />
      ) : null}
      <Link to={link.to}>{link.label}</Link>
      <div className="d-flex-center">
        {loading ? (
          <ClockLoader color="var(--secondary-color)" />
        ) : (
          <Button disabled={loading} label={buttonLabel} />
        )}
      </div>
    </form>
  )
}
