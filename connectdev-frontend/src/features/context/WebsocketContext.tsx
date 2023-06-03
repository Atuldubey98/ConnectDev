import { createContext, useEffect } from "react"

import React from "react"
import { useAppDispatch } from "../../app/hooks"
import socket from "../../socket"
import { setConnectionState } from "../chats/chatsSlice"
import useUserToast from "../common/useUserToast"
import { ErrorNotification } from "../posts/interfaces"
import { setDislike, setLike } from "../posts/postSlice"
import { NotificationsEntity } from "../notifications/interfaces"
import { setAddNotification } from "../notifications/notificationSlice"

export type WebsocketContextProps = {
  tryConnectingToServer: VoidFunction
}
export const WebsocketContext = createContext<WebsocketContextProps | null>(
  null,
)
export type WebsocketContextProviderProps = {
  children?: React.ReactNode
}
export default function WebsocketContextProvider({
  children,
}: WebsocketContextProviderProps) {
  const appDispatch = useAppDispatch()
  const { showToast } = useUserToast()
  useEffect(() => {
    socket.connect()
    socket.on("connect", () => {
      appDispatch(setConnectionState(socket.connected))
    })
    socket.on("notify:success", (data) => {
      const notification: NotificationsEntity = data
      appDispatch(setAddNotification(notification))
      showToast(notification.message, false)
    })
    socket.on("notify:error", (data) => {
      const notification: ErrorNotification = data
      showToast(notification.message, true)
    })
    socket.on("like", (data) => {
      appDispatch(setLike(data))
    })
    socket.on("unlike", (data) => {
      appDispatch(setDislike(data))
    })
    socket.on("disconnect", () => {
      appDispatch(setConnectionState(socket.connected))
    })
    ;() => {
      socket.disconnect()
      socket.off("notify:success", () => {})
      socket.off("notify:error", () => {})
      socket.off("like", () => {})
      socket.off("unlike", () => {})
    }
  }, [])

  function tryConnectingToServer() {
    socket.connect()
  }
  return (
    <WebsocketContext.Provider value={{ tryConnectingToServer }}>
      {children}
    </WebsocketContext.Provider>
  )
}
