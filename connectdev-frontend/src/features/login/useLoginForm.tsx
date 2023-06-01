import React, { ChangeEventHandler, useContext, useReducer } from "react"
import { useAppDispatch } from "../../app/hooks"
import { loginUserAction } from "./loginSlice"
import { useNavigate } from "react-router-dom"
import { WebsocketContext } from "../context/WebsocketContext"

export default function useLoginForm() {
  const socketContext = useContext(WebsocketContext)
  const appDispatch = useAppDispatch()
  const navigate = useNavigate()
  function navigateToPosts() {
    navigate("/posts")
  }
  const defaulLoginState = {
    email: "",
    password: "",
    emailErrTxt: "",
    passwordErrTxt: "",
  }
  type State = {
    email: string
    emailErrTxt: string
    password: string
    passwordErrTxt: string
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
          state.password.length <= 5
            ? "Password Length should  be greater than 5"
            : ""
        state.emailErrTxt =
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(state.email)
            ? ""
            : "Email is not valid"
        return state
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(reducer, defaulLoginState)
  const onChangeField: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value, name } = e.target
    dispatch({
      type: "change",
      text: {
        value,
        name,
      },
    })
    dispatch({ type: "validate" })
  }
  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    appDispatch(
      loginUserAction(
        state.email,
        state.password,
        navigateToPosts,
        socketContext && socketContext.tryConnectingToServer,
      ),
    )
  }
  return { onSubmit, onChangeField, state }
}
