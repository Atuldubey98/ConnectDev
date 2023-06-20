import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { NotificationsEntity, NotificationsResponse } from "./interfaces"
import { AppThunk } from "../../app/store"
import {
  getNotificationsByUser,
  loadAllFriendRequests,
  updateReadNotification,
} from "./notificationAPI"
import { FriendRequestEntity } from "../profile/interfaces"
import { acceptFriendRequest, cancelFriendRequest } from "../profile/profileAPI"
type Type = {
  unreadCount: number
  notificationStatus: "idle" | "failure" | "loading" | "success"
  notificationsResponse: null | NotificationsResponse
  hasNextNotification: boolean
  friendRequests: FriendRequestEntity[] | null
}
const initialState: Type = {
  unreadCount: 0,
  friendRequests: null,
  hasNextNotification: true,
  notificationStatus: "idle",
  notificationsResponse: null,
}
const notificationSlice = createSlice({
  initialState,
  name: "notification",
  reducers: {
    setFriendRequests: (
      state,
      action: PayloadAction<FriendRequestEntity[]>,
    ) => {
      state.friendRequests = action.payload
    },
    setAddFriendRequest: (
      state,
      action: PayloadAction<FriendRequestEntity>,
    ) => {
      state.friendRequests = state.friendRequests
        ? [...state.friendRequests, action.payload]
        : null
    },
    setAcceptFriendRequest: (state, action: PayloadAction<string>) => {
      state.friendRequests = state.friendRequests
        ? state.friendRequests.filter(
            (request) => request._id !== action.payload,
          )
        : null
    },
    setDeniedFriendRequest: (state, action: PayloadAction<string>) => {
      state.friendRequests = state.friendRequests
        ? state.friendRequests.filter(
            (request) => request._id !== action.payload,
          )
        : null
    },
    setNotificationsLoading: (state) => {
      state.notificationStatus = "loading"
    },
    setNotificationsIdle: (state) => {
      state.notificationsResponse = initialState.notificationsResponse
    },
    setUpdateReadNotification: (state, action: PayloadAction<string>) => {
      state.notificationsResponse!.notifications = state.notificationsResponse
        ? state.notificationsResponse!.notifications!.map((n) =>
            n._id === action.payload ? { ...n, read: true } : n,
          )
        : null
    },
    setNotificationsLoaded: (
      state,
      action: PayloadAction<NotificationsResponse>,
    ) => {
      state.notificationStatus = "success"
      state.notificationsResponse = state.notificationsResponse
        ? {
            ...state.notificationsResponse,
            notifications: state.notificationsResponse?.notifications
              ? [
                  ...state.notificationsResponse.notifications,
                  ...(action.payload.notifications || []),
                ]
              : [...(action.payload.notifications || [])],
          }
        : action.payload
      state.hasNextNotification = action.payload.hasNextPage
    },
    setNotificationsError: (state) => {
      state.notificationStatus = "failure"
    },
    setAddNotification: (state, action: PayloadAction<NotificationsEntity>) => {
      state.notificationsResponse = state.notificationsResponse
        ? {
            ...state.notificationsResponse,
            notifications: [
              action.payload,
              ...(state.notificationsResponse.notifications || []),
            ],
          }
        : null
    },
  },
})
export const {
  setNotificationsLoading,
  setNotificationsLoaded,
  setNotificationsError,
  setAddNotification,
  setNotificationsIdle,
  setFriendRequests,
  setAddFriendRequest,
  setAcceptFriendRequest,
  setDeniedFriendRequest,
  setUpdateReadNotification,
} = notificationSlice.actions
export default notificationSlice.reducer
export const loadNotificationsAction =
  (page: number): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setNotificationsLoading())
      const { data } = await getNotificationsByUser(page)
      dispatch(setNotificationsLoaded(data))
    } catch (error) {
      dispatch(setNotificationsError())
    }
  }

export const acceptFriendRequestNotificationAction =
  (
    friendRequestId: string,
    sendFriendRequestAcceptedNotification: (
      acceptedFriendRequest: FriendRequestEntity,
    ) => void,
  ): AppThunk =>
  async (dispatch) => {
    try {
      const { data } = await acceptFriendRequest(friendRequestId)
      dispatch(setAcceptFriendRequest(friendRequestId))
      sendFriendRequestAcceptedNotification(data)
    } catch (error) {}
  }
export const cancelFriendRequestNotificationAction =
  (friendRequestId: string): AppThunk =>
  async (dispatch) => {
    try {
      const response = await cancelFriendRequest(friendRequestId)
      if (response.status === 204) {
        dispatch(setDeniedFriendRequest(friendRequestId))
      }
    } catch (error) {}
  }
export const updateReadNotificationAction =
  (
    notificationId: string,
    href: string,
    navigateToPost: (href: string) => void,
  ): AppThunk =>
  async (dispatch) => {
    try {
      const response = await updateReadNotification(notificationId)
      if (response.status === 200) {
        dispatch(setUpdateReadNotification(notificationId))
        navigateToPost(href)
      }
    } catch (error) {
      console.log(error)
    }
  }

export const loadFriendRequestsAction = (): AppThunk => async (dispatch) => {
  try {
    const { data } = await loadAllFriendRequests()
    dispatch(setFriendRequests(data))
  } catch (error) {}
}
