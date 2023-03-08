import { createContext, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import { CHAT_MESSAGE_ADD } from "../redux/constants/chatConstants";
export const SocketContext = createContext();
export const socket = io("http://localhost:9000", {
  withCredentials: true,
});

export const SocketContextProvider = ({ children }) => {
  const [connected, setConnected] = useState(false);
  const dispatch = useDispatch();
  const messageRef = useRef();
  useEffect(() => {
    socket.on("connect", () => {
      console.log("User connected !");
      setConnected(true);
    });
    socket.io.on("reconnect_error", (error) => {
      console.log(error);
    });
    socket.io.on("reconnect_failed", () => {
      console.log("Reconnect failed ");
    });
    socket.on("disconnect", (reason) => {
      setConnected(false);
      if (reason === "io server disconnect") {
        socket.connect();
      }
    });
    socket.on("connect_error", () => {});
    socket.on("private", (data) => {
      dispatch({ type: CHAT_MESSAGE_ADD, payload: data });
      messageRef.current.scrollIntoView({ behavior: "smooth" });
    });
    socket.on("notify", (data) => {
      toast.info(data.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    });
  }, [dispatch]);
  function sendMsgOnSocket(data) {
    socket.emit("message", data);
  }
  function likePost(data) {
    socket.emit("like", data);
  }
  function commentOnPostSocket(data) {
    socket.emit("comment", data);
  }
  function joinRoom(roomId) {
    socket.emit("subscribe", roomId);
  }
  return (
    <SocketContext.Provider
      value={{
        likePost,
        connected,
        commentOnPostSocket,
        sendMsgOnSocket,
        messageRef,
        joinRoom,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
