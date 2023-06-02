import { createContext, useEffect, useState } from "react"

import React from "react"
import socket from "../../socket"
import { useAppDispatch } from "../../app/hooks"
import { setConnectionState } from "../chats/chatsSlice"
import useUserToast from "../common/useUserToast"
import { Notification } from "../posts/interfaces"
import { setDislike, setLike } from "../posts/postSlice"

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
    socket.on("notify", (data) => {
      const notification: Notification = data
      showToast(notification.message, notification.isError)
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
      socket.off("notify", () => {})
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
