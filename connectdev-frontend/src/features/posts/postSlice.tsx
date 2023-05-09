import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { AppThunk } from "../../app/store"

import { isAxiosError } from "axios"
import { ILikePost, ILikes, IPostResponse } from "../../interfaces/post"
import { fetchAllPosts, likeOrDislikePost } from "./postAPI"
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
      if (state.postResponse?.posts && action.payload.posts) {
        state.postResponse.count = action.payload.count
        state.postResponse.page = action.payload.count
        state.postResponse.posts = [
          ...state.postResponse.posts,
          ...action.payload.posts,
        ]
        state.postResponse.totalCount = action.payload.totalCount
        state.postResponse.totalPages = action.payload.totalPages
      } else {
        state.postResponse = action.payload
      }
    },
    setLike: (state, action: PayloadAction<ILikes>) => {
      if (state.postResponse && state.postResponse.posts) {
        state.postResponse.posts = state.postResponse!.posts?.map((post) =>
          post._id === action.payload.post
            ? {
                ...post,
                likes: post.likes
                  ? [...post.likes, action.payload]
                  : [action.payload],
              }
            : post,
        )
      }
    },
    setIdle: (state) => {
      state.status = "idle"
      state.postResponse = null
    },
    setDislike: (state, action: PayloadAction<ILikes>) => {
      if (state.postResponse && state.postResponse.posts) {
        state.postResponse.posts = state.postResponse.posts.map((post) => {
          return post._id === action.payload.post
            ? {
                ...post,
                likes: post.likes?.filter(
                  (like) => like.user._id !== action.payload.user._id,
                ),
              }
            : post
        })
      }
    },
  },
})
export const {
  setFailed,
  setLoading,
  setSuccess,
  setIdle,
  setLike,
  setDislike,
} = postSlice.actions
export const getAllPosts =
  (page: number): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setLoading())
      const { data } = await fetchAllPosts(page)
      dispatch(setSuccess(data))
    } catch (error) {
      dispatch(
        setFailed(
          isAxiosError(error) ? error.response?.data.message : "Error occured",
        ),
      )
    }
  }
export const dolikeorDislikePost =
  (postId: string): AppThunk =>
  async (dispatch) => {
    try {
      const { data } = await likeOrDislikePost(postId)
      const likePostorDislike: ILikes = { user: data.user, post: postId }

      if (data.status) {
        dispatch(setLike(likePostorDislike))
      } else {
        dispatch(setDislike(likePostorDislike))
      }
    } catch (error) {
      dispatch(
        setFailed(
          isAxiosError(error) ? error.response?.data.message : "Error occured",
        ),
      )
    }
  }

export default postSlice.reducer
