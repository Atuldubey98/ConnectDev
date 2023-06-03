import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { NotificationsEntity, NotificationsResponse } from "./interfaces"
import { AppThunk } from "../../app/store"
import {
  getNotificationsByUser,
  updateReadNotification,
} from "./notificationAPI"
type Type = {
  unreadCount: number
  notificationStatus: "idle" | "failure" | "loading" | "success"
  notificationsResponse: null | NotificationsResponse
  hasNextNotification: boolean
}
const initialState: Type = {
  unreadCount: 0,
  hasNextNotification: true,
  notificationStatus: "idle",
  notificationsResponse: null,
}
const notificationSlice = createSlice({
  initialState,
  name: "notification",
  reducers: {
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
      state.hasNextNotification = action.payload.hasNextPage;
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
