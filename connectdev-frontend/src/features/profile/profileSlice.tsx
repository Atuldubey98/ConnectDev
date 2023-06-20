import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { isAxiosError } from "axios"
import { AppThunk } from "../../app/store"
import { UpdateProfileBody } from "../profileEdit/interfaces"
import {
  FriendRequest,
  FriendRequestWithRecipient,
  IProfile
} from "./interfaces"
import {
  acceptFriendRequest,
  cancelFriendRequest,
  countTotalPostByUserId,
  loadFriendshipStatus,
  loadProfile,
  sendFriendRequest,
  updateProfile,
  updateProfileAvatar,
  uploadProfileAvatar,
} from "./profileAPI"

type State = {
  profileStatus: "loading" | "success" | "failure" | "idle"
  profile: IProfile | null
  updateStatus: "loading" | "success" | "failure" | "idle"
  updateError: string
  friendRequest: FriendRequest | null
  totalPostByUser: number
  profileAvatarStatus: "idle" | "success" | "failure" | "loading"
}
const initialState: State = {
  profileStatus: "idle",
  profileAvatarStatus: "idle",
  profile: null,
  updateStatus: "idle",
  updateError: "",
  totalPostByUser: 0,
  friendRequest: null,
}
const profileSlice = createSlice({
  initialState,
  name: "profile",
  reducers: {
    setProfileAvatarError: (state) => {
      state.profileAvatarStatus = "failure"
    },
    setProfileFriendShipStatus: (
      state,
      action: PayloadAction<FriendRequestWithRecipient>,
    ) => {
      if (state.profile?.user._id === action.payload.recipient._id) {
        state.friendRequest = state.friendRequest
          ? {
              ...state.friendRequest,
              status: action.payload.status,
            }
          : null
      }
    },
    setProfileAvatarLoading: (state) => {
      state.profileAvatarStatus = "loading"
    },
    setProfileAvatar: (state, action: PayloadAction<string>) => {
      state.profileAvatarStatus = "success"
      state.profile = state.profile
        ? {
            ...state.profile,
            user: { ...state.profile.user, avatar: action.payload },
          }
        : null
    },
    setUpdateLoading: (state) => {
      state.updateStatus = "loading"
      state.updateError = ""
    },
    setUpdateError: (state, action: PayloadAction<string>) => {
      state.updateError = action.payload
      state.profileStatus = "failure"
    },
    setProfileLoading: (state) => {
      state.profileStatus = "loading"
    },
    setProfileSuccess: (state, action: PayloadAction<IProfile>) => {
      state.profileStatus = "success"
      state.profile = action.payload
    },
    setProfileError: (state) => {
      state.profileStatus = "failure"
      state.profile = null
    },
    setTotalPostByUser: (state, action: PayloadAction<number>) => {
      state.totalPostByUser = action.payload
    },
    setFriendRequest: (state, action: PayloadAction<FriendRequest>) => {
      state.friendRequest = action.payload
    },
    setFriendRequestIdle: (state) => {
      state.friendRequest = null
    },
  },
})

export const {
  setProfileError,
  setProfileLoading,
  setProfileAvatarLoading,
  setProfileSuccess,
  setUpdateError,
  setTotalPostByUser,
  setProfileAvatar,
  setProfileAvatarError,
  setFriendRequest,
  setFriendRequestIdle,
  setUpdateLoading,
  setProfileFriendShipStatus,
} = profileSlice.actions

export const loadFriendshipStatusAction =
  (friendUserId: string): AppThunk =>
  async (dispatch) => {
    try {
      if (!friendUserId) {
        return
      }
      const { data } = await loadFriendshipStatus(friendUserId)
      dispatch(setFriendRequest(data))
    } catch (error) {}
  }

export const sendFriendRequestAction =
  (
    friendUserId: string,
    sendNotificationForFriendRequestSent: (friendRequestId: string) => void,
  ): AppThunk =>
  async (dispatch) => {
    try {
      if (!friendUserId) {
        return
      }
      const { data } = await sendFriendRequest(friendUserId)
      dispatch(setFriendRequest(data))
      sendNotificationForFriendRequestSent(data._id)
    } catch (error) {}
  }

export const cancelFriendRequestAction =
  (
    friendRequestId: string,
    cancelFriendRequestSendNotificaition: () => void,
  ): AppThunk =>
  async (dispatch) => {
    try {
      if (!friendRequestId) {
        return
      }
      const response = await cancelFriendRequest(friendRequestId)
      if (response.status === 204) {
        dispatch(setFriendRequestIdle())
        cancelFriendRequestSendNotificaition()
      }
    } catch (error) {}
  }

export const acceptFriendRequestAction =
  (friendRequestId: string): AppThunk =>
  async (dispatch) => {
    try {
      if (!friendRequestId) {
        return
      }
      const { data } = await acceptFriendRequest(friendRequestId)
      dispatch(setFriendRequest(data))
    } catch (error) {}
  }
export const loadProfileAction =
  (userId: string | undefined): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setProfileLoading())
      const { data } = await loadProfile(userId)
      dispatch(setProfileSuccess(data))
    } catch (error) {
      dispatch(setProfileError())
    }
  }
export const getCountOfPostsByUserIdAction =
  (userId: string): AppThunk =>
  async (dispatch) => {
    try {
      if (!userId) {
        return
      }
      const { data: count } = await countTotalPostByUserId(userId)
      dispatch(setTotalPostByUser(count))
    } catch (error) {
      console.log(error)
    }
  }
export const updateProfileAction =
  (
    profile: UpdateProfileBody,
    navigateToProfile: VoidFunction,
    showToast: VoidFunction,
  ): AppThunk =>
  async (dispatch) => {
    try {
      await updateProfile(profile)
      showToast()
      navigateToProfile()
    } catch (error) {
      dispatch(
        setUpdateError(
          isAxiosError(error)
            ? error.response?.data.message
            : "Error Occured !",
        ),
      )
    }
  }
export const uploadProfileAvatarAction =
  (profileAvatar: File): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setProfileAvatarLoading())
      const { data } = await uploadProfileAvatar(profileAvatar)
      dispatch(setProfileAvatar(data))
    } catch (error) {
      dispatch(setProfileAvatarError())
    }
  }
export const updateProfileAvatarAction =
  (profileAvatar: File): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setProfileAvatarLoading())
      const { data } = await updateProfileAvatar(profileAvatar)
      dispatch(setProfileAvatar(data))
    } catch (error) {
      dispatch(setProfileAvatarError())
    }
  }

export default profileSlice.reducer
