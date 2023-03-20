import React, { useContext, useEffect } from "react";
import Header from "../components/Header";
import SideNav from "../components/SideNav";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import useQuery from "../hooks/useQuery";
import MainchatComponent from "../components/chatscreen/MainchatComponent";
import { socket, SocketContext } from "../context/SocketContext";

function ChatsPage() {
  const query = useQuery();
  const { connected } = useContext(SocketContext);
  useEffect(() => {
    if (!connected) {
      socket.connect();
    }
  }, [connected]);
  return (
    <div>
      <Header />
      <div className="container-fluid vh-100">
        <div className="row">
          {query.has("nav") && <SideNav />}
          <MainchatComponent />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default ChatsPage;
