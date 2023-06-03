import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { AppThunk } from "../../app/store"

type State = {
  commentsModal: {
    postId: string
    isCommentsModalOpen: boolean
  }
  justAddedPost: {
    justAdded: boolean
    postId: string
  }
}
const initialState: State = {
  commentsModal: {
    postId: "",
    isCommentsModalOpen: false,
  },
  justAddedPost: {
    justAdded: false,
    postId: "",
  },
}
const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setCommentsModalPost: (state, action: PayloadAction<string>) => {
      state.commentsModal.postId = action.payload
    },
    setCommentsModal: (state) => {
      state.commentsModal.isCommentsModalOpen =
        !state.commentsModal.isCommentsModalOpen
    },
    setPostWasJustAdded: (state) => {
      state.justAddedPost.justAdded = !state.justAddedPost.justAdded
    },
    setJustAddedPostId: (state, action: PayloadAction<string>) => {
      state.justAddedPost.postId = action.payload
    },
  },
})
export const {
  setCommentsModalPost,
  setCommentsModal,
  setPostWasJustAdded,
  setJustAddedPostId,
} = uiSlice.actions
export const toggleCommentsModalPost =
  (postId: string): AppThunk =>
  async (dispatch) => {
    dispatch(setCommentsModalPost(postId))
  }
export const toggleCommentsModal = (): AppThunk => async (dispatch) => {
  dispatch(setCommentsModal())
}

export const setPostWasJustAddedAction =
  (postId: string): AppThunk =>
  async (dispatch) => {
    dispatch(setPostWasJustAdded())
    dispatch(setJustAddedPostId(postId))
    setTimeout(() => {
      dispatch(setPostWasJustAdded())
    }, 300)
  }
export default uiSlice.reducer
