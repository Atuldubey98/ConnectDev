import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { AppThunk } from "../../app/store"
import { UserWithActiveStatus } from "../posts/interfaces"
import { createContact, loadFriends } from "./friendsAPI"
import { FriendActiveStatus } from "./interface"
import socket from "../../socket"
type Status = "loading" | "failure" | "success" | "idle"

export interface Friend extends UserWithActiveStatus {
  contactCreationStatus: Status
}
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
    setUpdateContactCreationStatus: (
      state,
      action: PayloadAction<{
        contactCreationStatus: Status
        friendId: string
      }>,
    ) => {
      state.friends = state.friends
        ? state.friends.map((friend) =>
          friend._id === action.payload.friendId
            ? {
              ...friend,
              contactCreationStatus: action.payload.contactCreationStatus,
            }
            : friend,
        )
        : null
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
  setUpdateFriendActiveStatus,
  setUpdateContactCreationStatus,
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

export const createContactAction =
  (
    recipientUserId: string,
    navigateToChatForContact: (contactId: string) => void,
  ): AppThunk =>
    async (dispatch) => {
      try {
        dispatch(
          setUpdateContactCreationStatus({
            contactCreationStatus: "loading",
            friendId: recipientUserId,
          }),
        )
        const { data } = await createContact(recipientUserId)
        dispatch(
          setUpdateContactCreationStatus({
            contactCreationStatus: "success",
            friendId: recipientUserId,
          }),
        )
        navigateToChatForContact(data._id)
        socket.emit("subscribe", data);
      } catch (error) {
        dispatch(
          setUpdateContactCreationStatus({
            contactCreationStatus: "failure",
            friendId: recipientUserId,
          }),
        )
      }
    }
