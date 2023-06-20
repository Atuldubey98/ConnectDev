import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { AppThunk } from "../../app/store"
import { UserWithActiveStatus } from "../posts/interfaces"
import { loadFriends } from "./friendsAPI"
import { FriendActiveStatus } from "./interface"
type Friend = UserWithActiveStatus
type Type = {
  status: "idle" | "loading" | "success" | "failure"
  friends: Friend[] | null
}
const initialState: Type = {
  status: "idle",
  friends: null,
}

const friendsSlice = createSlice({
  initialState,
  name: "friends",
  reducers: {
    setFriendsLoaded: (state, action: PayloadAction<Friend[]>) => {
      state.status = "success"
      state.friends = action.payload
    },
    setFriendsLoading: (state) => {
      state.status = "loading"
    },
    setFriendsError: (state) => {
      state.status = "failure"
    },
    setUpdateFriendActiveStatus: (
      state,
      action: PayloadAction<FriendActiveStatus>,
    ) => {
      state.friends = state.friends
        ? state.friends.map((friend) =>
            friend._id === action.payload.friendUserId
              ? { ...friend, isActiveNow: action.payload.isActiveNow }
              : friend,
          )
        : null
    },
  },
})
export default friendsSlice.reducer
export const {
  setFriendsError,
  setFriendsLoaded,
  setFriendsLoading,
  setUpdateFriendActiveStatus
} = friendsSlice.actions

export const loadFriendsAction = (): AppThunk => async (dispatch) => {
  try {
    dispatch(setFriendsLoading())
    const { data } = await loadFriends()
    dispatch(setFriendsLoaded(data))
  } catch (error) {
    dispatch(setFriendsError())
  }
}
