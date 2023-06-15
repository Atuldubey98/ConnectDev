import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { IUserDetails } from "../posts/interfaces"
import { AppThunk } from "../../app/store"
import { loadFriends } from "./friendsAPI"
type Type = {
  status: "idle" | "loading" | "success" | "failure"
  friends: IUserDetails[] | null
}
const initialState: Type = {
  status: "idle",
  friends: null,
}
const friendsSlice = createSlice({
  initialState,
  name: "friends",
  reducers: {
    setFriendsLoaded: (state, action: PayloadAction<IUserDetails[]>) => {
      state.status = "success"
      state.friends = action.payload
    },
    setFriendsLoading: (state) => {
      state.status = "loading"
    },
    setFriendsError: (state) => {
      state.status = "failure"
    },
  },
})
export default friendsSlice.reducer
export const { setFriendsError, setFriendsLoaded, setFriendsLoading } =
  friendsSlice.actions

export const loadFriendsAction = (): AppThunk => async (dispatch) => {
  try {
    dispatch(setFriendsLoading())
    const { data } = await loadFriends()
    dispatch(setFriendsLoaded(data))
  } catch (error) {
    dispatch(setFriendsError())
  }
}
