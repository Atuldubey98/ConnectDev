import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { AppThunk } from "../../app/store"

import { isAxiosError } from "axios"
import {
  IComment,
  ICreatePost,
  ILikes,
  IPost,
  IPostResponse,
} from "./interfaces"
import {
  createNewPost,
  deleteComment,
  deletePost,
  fetchAllPosts,
  fetchPost,
  likeOrDislikePost,
  makeNewComment,
} from "./postAPI"
import { searchByPost } from "../search/searchAPI"
type PostState = {
  status: "success" | "loading" | "failed" | "idle"
  newPostStatus: "success" | "loading" | "failure" | "idle"
  singlePostStatus: "success" | "loading" | "failure" | "idle"
  newCommentStatus: "success" | "loading" | "failure" | "idle"
  postResponse: IPostResponse | null
  hasNextPost: boolean
  singlePostError: string
  post: IPost | null
}
const initialState: PostState = {
  status: "idle",
  hasNextPost: true,
  postResponse: null,
  newPostStatus: "idle",
  newCommentStatus: "idle",
  singlePostStatus: "idle",
  singlePostError: "",
  post: null,
}

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setSiglePostLoading: (state) => {
      state.singlePostStatus = "loading"
    },
    setSinglePostError: (state, action: PayloadAction<string>) => {
      state.singlePostStatus = "failure"
      state.singlePostError = action.payload
    },
    setPost: (state, action: PayloadAction<IPost>) => {
      state.post = action.payload
      state.singlePostStatus = "success"
      state.singlePostError = ""
    },
    setNewPostLoading: (state) => {
      state.newPostStatus = "loading"
    },
    setNewPostError: (state) => {
      state.newPostStatus = "failure"
    },
    setNewCommentLoading: (state) => {
      state.newCommentStatus = "loading"
    },
    setNewCommentError: (state) => {
      state.newCommentStatus = "failure"
    },
    setDeletePost: (state, action: PayloadAction<string>) => {
      if (state.postResponse && state.postResponse.posts) {
        state.postResponse.posts = state.postResponse.posts.filter(
          (post) => post._id !== action.payload,
        )
      }
    },
    setDeleteComment: (
      state,
      action: PayloadAction<{ postId: string; commentId: string }>,
    ) => {
      if (state.postResponse && state.postResponse.posts) {
        state.postResponse.posts = state.postResponse.posts.map((post) =>
          post._id === action.payload.postId
            ? {
                ...post,
                comments: post.comments
                  ? post.comments.filter(
                      (co) => co._id !== action.payload.commentId,
                    )
                  : [],
              }
            : post,
        )
      }
    },
    setNewCommentLoaded: (state, action: PayloadAction<IComment>) => {
      state.newCommentStatus = "success"
      if (state.postResponse && state.postResponse.posts) {
        state.postResponse.posts = state.postResponse!.posts?.map((post) =>
          post._id === action.payload.post
            ? {
                ...post,
                comments: post.comments
                  ? [action.payload, ...post.comments]
                  : [action.payload],
              }
            : post,
        )
      }
    },
    setNewPostSuccess: (state, action: PayloadAction<IPost>) => {
      state.newPostStatus = "success"
      if (state.postResponse && state.postResponse?.posts) {
        state.postResponse!.posts = [
          action.payload,
          ...state.postResponse?.posts,
        ]
      }
    },

    setLoading: (state) => {
      state.status = "loading"
    },
    setFailed: (state) => {
      state.status = "failed"
    },
    setSuccess: (state, action: PayloadAction<IPostResponse>) => {
      state.status = "success"
      if (state.postResponse?.posts && action.payload.posts) {
        state.postResponse = {
          ...action.payload,
          posts: [...state.postResponse.posts, ...action.payload.posts],
        }
      } else {
        state.postResponse = action.payload
      }
      state.hasNextPost = action.payload.hasNextPage
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
  setNewPostError,
  setNewPostLoading,
  setNewPostSuccess,
  setLike,
  setDislike,
  setNewCommentError,
  setNewCommentLoaded,
  setNewCommentLoading,
  setDeleteComment,
  setDeletePost,
  setSinglePostError,
  setSiglePostLoading,
  setPost,
} = postSlice.actions

export const getPostAction =
  (postId: string | undefined): AppThunk =>
  async (dispatch) => {
    try {
      if (!postId) {
        return
      }
      dispatch(setSiglePostLoading())
      const { data } = await fetchPost(postId)
      dispatch(setPost(data))
    } catch (error) {
      dispatch(
        setFailed(
          isAxiosError(error) ? error.response?.data.message : "Error occured",
        ),
      )
    }
  }
export const getAllPosts =
  (page: number, user: string): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setLoading())

      const { data } = await fetchAllPosts(page, user)
      dispatch(setSuccess(data))
    } catch (error) {
      dispatch(
        setFailed(
          isAxiosError(error) ? error.response?.data.message : "Error occured",
        ),
      )
    }
  }
export const searchPostByNameAction =
  (page: number, search: string, user: string): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setLoading())
      const { data } = await searchByPost(search, page)
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

export const createPostAction =
  (
    post: ICreatePost,
    showToast: (message: string, isError: boolean) => void,
    showAnimationOnNewPost: (postId: string) => void,
  ): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setNewPostLoading())
      const { data } = await createNewPost(post)
      const newPost: IPost = data.post
      dispatch(setNewPostSuccess(newPost))
      showToast("Posted", false)
      showAnimationOnNewPost(newPost._id)
    } catch (error) {
      dispatch(
        setNewPostError(
          isAxiosError(error) ? error.response?.data.message : "Error occured",
        ),
      )
      showToast(
        isAxiosError(error) ? error.response?.data.message : "Error occured",
        true,
      )
    }
  }
export const postCommentAction =
  (
    body: { postId: string; text: string },
    scrollCommentsOnPost: () => void,
  ): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setNewCommentLoading())
      if (body.postId.length === 0 || body.text.length === 0) return
      const { data } = await makeNewComment(body)
      dispatch(setNewCommentLoaded(data.comment))
      setTimeout(() => {
        scrollCommentsOnPost()
      }, 500)
    } catch (error) {
      dispatch(
        setNewCommentError(
          isAxiosError(error) ? error.response?.data.message : "Error occured",
        ),
      )
    }
  }
export const deleteCommentAction =
  (body: { postId: string; commentId: string }): AppThunk =>
  async (dispatch) => {
    try {
      if (body.postId.length === 0 || body.commentId.length === 0) return
      await deleteComment(body)
      dispatch(setDeleteComment(body))
    } catch (error) {
      dispatch(
        setNewCommentError(
          isAxiosError(error) ? error.response?.data.message : "Error occured",
        ),
      )
    }
  }

export const deletePostAction =
  (body: { postId: string }): AppThunk =>
  async (dispatch) => {
    try {
      if (body.postId.length === 0) {
        return
      }
      await deletePost(body)
      dispatch(setDeletePost(body.postId))
    } catch (error) {
      dispatch(
        setNewCommentError(
          isAxiosError(error) ? error.response?.data.message : "Error occured",
        ),
      )
    }
  }
export default postSlice.reducer
