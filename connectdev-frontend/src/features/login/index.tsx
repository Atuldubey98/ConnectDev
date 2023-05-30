import { useAppSelector } from "../../app/hooks"
import AuthForm from "../common/AuthForm"
import "./LoginPage.css"
import useLoginForm from "./useLoginForm"
export default function LoginPage() {
  const { onSubmit, onChangeField, state } = useLoginForm()

  const { status, loginMessage } = useAppSelector((state) => state.login)
  const loading = status === "loading"
  return (
    <main className="login__page d-flex-center">
      <section className="auth__head">
        <h1>Login</h1>
      </section>
      <AuthForm
        loading={loading}
        onSubmit={onSubmit}
        buttonLabel="Login"
        messageInfo={loginMessage}
        link={{
          to: "/register",
          label: "Register Instead ?",
        }}
        state={state}
        emailProps={{
          name: "email",
          type: "email",
          onChange: onChangeField,
          label: "Email :",
          minLength: 5,
          maxLength: 30,
          required: true,
        }}
        passwordProps={{
          required: true,
          minLength: 6,
          maxLength: 30,
          name: "password",
          type: "password",
          onChange: onChangeField,
          label: "Password :",
        }}
      />
    </main>
  )
}
