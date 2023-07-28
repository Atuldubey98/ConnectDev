import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { AppThunk } from "../../app/store"

import { isAxiosError } from "axios"
import { load, login, logout } from "./loginAPI"
import IUser from "./interfaces"
type loginState = {
  loginMessage: {
    isError: boolean
    message: string
  }
  status: "success" | "loading" | "failed" | "idle"

  user: IUser | null
}
const initialState: loginState = {
  loginMessage: {
    isError: false,
    message: "",
  },
  status: "idle",
  user: null,
}

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.status = "loading"
      state.loginMessage = {
        isError: false,
        message: "",
      }
    },
    setFailed: (state, action: PayloadAction<string>) => {
      state.status = "failed"
      state.loginMessage = {
        isError: true,
        message: action.payload,
      }
    },
    setSuccess: (state, action: PayloadAction<IUser>) => {
      state.status = "success"
      state.loginMessage = {
        isError: false,
        message: "",
      }
      state.user = action.payload
    },
    setIdle: (state) => {
      state.status = "idle"
      state.loginMessage = {
        isError: false,
        message: "",
      }
      state.user = null
    },
  },
})
export const { setFailed, setLoading, setSuccess, setIdle } = loginSlice.actions
export const loginUserAction =
  (
    email: string,
    password: string,
    navigateToPosts: () => void,
    tryConnectingToServer: VoidFunction | null,
  ): AppThunk =>
    async (dispatch) => {
      try {
        dispatch(setLoading())
        const { data } = await login(email, password)
        dispatch(setSuccess(data))
        if (tryConnectingToServer) {
          tryConnectingToServer()
          navigateToPosts()
        }
      } catch (error) {
        dispatch(
          setFailed(
            isAxiosError(error) ? error.response?.data.message : "Error occured",
          ),
        )
      }
    }

export const loadUser = (): AppThunk => async (dispatch) => {
  try {
    dispatch(setLoading())
    const { data } = await load()
    dispatch(setSuccess(data))
  } catch (error) {
    dispatch(
      setFailed(
        isAxiosError(error) ? error.response?.data.message : "Error occured",
      ),
    )
  }
}
export const logoutUserAction =
  (
    showToast: (message: string, isError: boolean) => void,
    navigateToHome: () => void,
  ): AppThunk =>
    async (dispatch) => {
      try {
        const { data } = await logout()
        if (data.status) {
          dispatch(setIdle())
          navigateToHome()
        }
      } catch (error) {
        const message = isAxiosError(error)
          ? error.response?.data.message
          : "Error occured"
        showToast(message, true);
      }
    }
export default loginSlice.reducer
