import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { AppThunk } from "../../app/store"
import { register } from "./registerAPI"
import { isAxiosError } from "axios"

type RegisterState = {
  registerMessage: {
    isError: boolean
    message: string
  }
  status: "success" | "loading" | "failed" | "idle"
}
const initialState: RegisterState = {
  registerMessage: {
    isError: false,
    message: "",
  },
  status: "idle",
}

export const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.status = "loading"
      state.registerMessage = {
        isError: false,
        message: "",
      }
    },
    setFailed: (state, action: PayloadAction<string>) => {
      state.status = "failed"
      state.registerMessage = {
        isError: true,
        message: action.payload,
      }
    },
    setSuccess: (state, action: PayloadAction<string>) => {
      state.status = "success"
      state.registerMessage = {
        isError: false,
        message: action.payload,
      }
    },
    setIdle: (state) => {
      state.status = "idle"
      state.registerMessage = {
        isError: false,
        message: "",
      }
    },
  },
})
export const { setFailed, setLoading, setSuccess, setIdle } =
  registerSlice.actions
export const registerUser =
  (email: string, name: string, password: string): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setLoading())
      const response = await register(email, name, password)
      dispatch(setSuccess(response.data.message))
    } catch (error) {
      dispatch(
        setFailed(
          isAxiosError(error) ? error.response?.data.message : "Error occured",
        ),
      )
    }
  }

export default registerSlice.reducer
