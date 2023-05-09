import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { AppThunk } from "../../app/store"

import { isAxiosError } from "axios"
import { IPostResponse } from "../../interfaces/post"
import { fetchAllPosts } from "./postAPI"
type PostState = {
  status: "success" | "loading" | "failed" | "idle"
  postResponse: IPostResponse | null
}
const initialState: PostState = {
  status: "idle",
  postResponse: null,
}

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.status = "loading"
    },
    setFailed: (state) => {
      state.status = "failed"
    },
    setSuccess: (state, action: PayloadAction<IPostResponse>) => {
      state.status = "success"
      state.postResponse = action.payload
    },
    setIdle: (state) => {
      state.status = "idle"
      state.postResponse = null
    },
  },
})
export const { setFailed, setLoading, setSuccess, setIdle } = postSlice.actions
export const getAllPosts = (): AppThunk => async (dispatch) => {
  try {
    dispatch(setLoading())
    const { data } = await fetchAllPosts()
    dispatch(setSuccess(data))
  } catch (error) {
    dispatch(
      setFailed(
        isAxiosError(error) ? error.response?.data.message : "Error occured",
      ),
    )
  }
}

export default postSlice.reducer
