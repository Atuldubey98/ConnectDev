import { createContext, useEffect, useState } from "react"

import React from "react"
import socket from "../../socket"
import { useAppDispatch } from "../../app/hooks"
import { setConnectionState } from "../chats/chatsSlice"

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

  useEffect(() => {
    socket.connect()
    socket.on("connect", () => {
      appDispatch(setConnectionState(socket.connected))
    })
    socket.on("disconnect", () => {
      appDispatch(setConnectionState(socket.connected))
    })
    ;() => {
      socket.disconnect()
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
