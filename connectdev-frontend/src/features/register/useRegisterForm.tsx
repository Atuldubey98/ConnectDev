import React, { ChangeEventHandler, useEffect, useReducer } from "react"
import { useAppDispatch } from "../../app/hooks"
import { registerUser, setIdle } from "./registerSlice"

export default function useRegisterForm() {
  const appDispatch = useAppDispatch()
  const defaultRegisterState = {
    email: "",
    password: "",
    emailErrTxt: "",
    passwordErrTxt: "",
    name: "",
    nameErrText: "",
  }
  type State = {
    email: string
    emailErrTxt: string
    password: string
    passwordErrTxt: string

    name: string
    nameErrText: string
  }
  type Action =
    | {
        type: "change"
        text: {
          value: string
          name: string
        }
      }
    | {
        type: "validate"
      }
  function reducer(state: State, action: Action): State {
    switch (action.type) {
      case "change":
        return { ...state, [action.text.name]: action.text.value }
      case "validate":
        state.passwordErrTxt =
          state.password.length <= 6
            ? "Password Length should  be greater than 6"
            : ""
        state.emailErrTxt =
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(state.email)
            ? ""
            : "Email is not valid"
        state.nameErrText =
          state.name.length <= 3 ? "Name should be greater than 3" : ""
        return state
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(reducer, defaultRegisterState)
  const onChangeField: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value, name } = e.target
    dispatch({
      type: "change",
      text: {
        value,
        name,
      },
    })
    dispatch({
      type: "validate",
    })
  }
  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    appDispatch(registerUser(state.email, state.name, state.password))
  }

  return { onSubmit, onChangeField, state }
}
