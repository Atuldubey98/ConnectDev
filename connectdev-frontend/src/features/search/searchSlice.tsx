import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import axios, { isAxiosError } from "axios"
import { AppThunk } from "../../app/store"
import { IPostResponse } from "../posts/interfaces"
import { IUsersResponse } from "./interfaces"
import { searchByPost, searchByUser } from "./searchAPI"

type Type = {
  usersStatus: "idle" | "loading" | "failure" | "success"
  postsStatus: "idle" | "loading" | "failure" | "success"
  postsResponse: IPostResponse | null
  usersResponse: IUsersResponse | null
  usersSearchResponse: IUsersResponse | null
  postsError: string
  usersError: string
}
const initialState: Type = {
  usersStatus: "idle",
  postsStatus: "idle",
  postsResponse: null,
  usersResponse: null,
  usersSearchResponse: null,
  postsError: "",
  usersError: "",
}
const searchSlice = createSlice({
  name: "search",
  reducers: {
    setSearchLoading: (state) => {
      state.usersStatus = "loading"
      state.postsStatus = "loading"
    },
    setUsersSearchLoaded: (state, action: PayloadAction<IUsersResponse>) => {
      state.usersResponse = action.payload
      state.usersStatus = "success"
    },
    setPostsSerchLoaded: (state, action: PayloadAction<IPostResponse>) => {
      state.postsStatus = "success"
      state.postsResponse = action.payload
    },
    setUsersError: (state, action: PayloadAction<string>) => {
      state.usersError = action.payload
      state.usersStatus = "failure"
    },
    setPostsError: (state, action: PayloadAction<string>) => {
      state.postsStatus = "failure"
      state.postsError = action.payload
    },
    setSearchUsersIdle: (state) => {
      state.usersSearchResponse = null
    },
    setSearchedUsers: (state, action: PayloadAction<IUsersResponse>) => {
      state.usersStatus = "success"
      state.usersSearchResponse = state.usersSearchResponse
        ? {
            ...action.payload,
            users:
              state.usersSearchResponse && state.usersSearchResponse.users
                ? [
                    ...state.usersSearchResponse.users,
                    ...(action.payload.users || []),
                  ]
                : action.payload.users,
          }
        : action.payload
    },
  },
  initialState,
})
export const {
  setSearchedUsers,
  setPostsError,
  setPostsSerchLoaded,
  setSearchLoading,
  setUsersError,
  setUsersSearchLoaded,
  setSearchUsersIdle,
} = searchSlice.actions

export default searchSlice.reducer

export const searchAction =
  (search: string): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setSearchLoading())
      await axios.all([searchByPost(search), searchByUser(search)]).then(
        axios.spread((res1, res2) => {
          dispatch(setPostsSerchLoaded(res1?.data))
          dispatch(setUsersSearchLoaded(res2?.data))
        }),
      )
    } catch (error) {
      dispatch(
        setUsersError(
          isAxiosError(error)
            ? error.response?.data.message
            : "Error Occured !",
        ),
      )
      dispatch(
        setPostsError(
          isAxiosError(error)
            ? error.response?.data.message
            : "Error Occured !",
        ),
      )
    }
  }

export const searchUserAction =
  (search: string, page: number): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setSearchLoading())
      const { data } = await searchByUser(search, page)
      dispatch(setSearchedUsers(data))
    } catch (error) {
      dispatch(
        setUsersError(
          isAxiosError(error)
            ? error.response?.data.message
            : "Error Occured !",
        ),
      )
    }
  }
