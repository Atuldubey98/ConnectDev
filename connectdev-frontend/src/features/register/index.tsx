import { useAppSelector } from "../../app/hooks"
import AuthForm from "../common/AuthForm"
import Input from "../common/Input"
import InputWithError from "../common/InputWithError"
import "./RegisterPage.css"
import useRegisterForm from "./useRegisterForm"
export default function RegisterPage() {
  const { onSubmit, onChangeField, state } = useRegisterForm()
  const { name, nameErrText } = state

  const { registerMessage, status } = useAppSelector((state) => state.register)
  const loading = status === "loading"

  return (
    <main className="d-flex-center register__page">
      <section className="auth__head">
        <h1>Register</h1>
      </section>
      <AuthForm
        state={state}
        messageInfo={registerMessage}
        link={{
          to: "/login",
          label: "Already registered ?",
        }}
        loading={loading}
        onSubmit={onSubmit}
        buttonLabel="Register"
        emailProps={{
          name: "email",
          type: "email",
          onChange: onChangeField,
          label: "Email :",
        }}
        passwordProps={{
          name: "password",
          type: "password",
          onChange: onChangeField,
          label: "Password :",
        }}
      >
        <InputWithError
          input={
            <Input
              onChange={onChangeField}
              value={name}
              name="name"
              label="Name :"
            />
          }
          error={nameErrText}
        />
      </AuthForm>
    </main>
  )
}
