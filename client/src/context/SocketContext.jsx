import { createContext, useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import { CHAT_MESSAGE_ADD } from "../redux/constants/chatConstants";
export const SocketContext = createContext();
export const socket = io("ws://localhost:9000", { withCredentials: true });
export const SocketContextProvider = ({ children }) => {
  const [connected, setConnected] = useState(socket.connected);
  const { activeRoom } = useSelector((state) => state.chatUser);
  const dispatch = useDispatch();
  const messageRef = useRef();

  const privateReaction = useCallback(
    (data) => {
      if (data.roomId === activeRoom) {
        dispatch({ type: CHAT_MESSAGE_ADD, payload: data });
        messageRef.current.scrollIntoView({ behavior: "smooth" });
      } else {
        const { user } = data;
        toast.info(`${user.name} sent a message`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    },
    [dispatch, activeRoom]
  );

  useEffect(() => {
    function onReconnectError(error) {
      console.log(error);
    }
    function onConnect() {
      setConnected(true);
    }
    function onDisconnect(reason) {
      setConnected(false);
      if (reason === "io server disconnect") {
        socket.connect();
      }
    }
    function onConnectError() {}
    function onPrivate(data) {
      privateReaction(data);
    }
    function onNotify(data) {
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
    }
    socket.on("connect", onConnect);
    socket.io.on("reconnect_error", onReconnectError);
    socket.on("disconnect", onDisconnect);
    socket.on("connect_error", onConnectError);
    socket.on("private", onPrivate);
    socket.on("notify", onNotify);
    return () => {
      socket.off("private", onPrivate);
      socket.off("notify", onNotify);
    };
  }, [dispatch, privateReaction]);

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
