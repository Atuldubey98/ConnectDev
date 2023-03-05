import { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { toast } from "react-toastify";
export const SocketContext = createContext();
export const socket = io("http://localhost:9000", {
  withCredentials: true,
  autoConnect: false,
});
export const SocketContextProvider = ({ children }) => {
  const [connected, setConnected] = useState(false);
  useEffect(() => {
    socket.connect();
    socket.on("connect", () => {
      console.log("User connected !");
      setConnected(true);
    });

    socket.on("disconnect", (reason) => {
      setConnected(false);
      if (reason === "io server disconnect") {
        socket.connect();
      }
    });
    socket.on("connect_error", () => {});
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
  }, []);

  function likePost(data) {
    socket.emit("like", data);
  }
  function commentOnPostSocket(data) {
    socket.emit("comment", data);
  }
  return (
    <SocketContext.Provider
      value={{ likePost, connected, commentOnPostSocket }}
    >
      {children}
    </SocketContext.Provider>
  );
};
