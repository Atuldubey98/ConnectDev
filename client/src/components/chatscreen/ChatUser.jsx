import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { SocketContext } from "../../context/SocketContext";
import instance from "../../instance";
import { CREATE_CHATID_SUCCESS } from "../../redux/constants/chatUserConstants";

function ChatUser(user) {
  const { name, email, isContact } = user;
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.user);
  const { joinRoom } = useContext(SocketContext);
  const [loading, setLoading] = useState(false);
  async function onCreateContact() {
    try {
      setLoading(true);
      const body = [user._id, currentUser._id];
      const { data } = await instance.post("/api/chat/contact", body);

      if (data.status) {
        dispatch({ type: CREATE_CHATID_SUCCESS, payload: user._id });
        joinRoom(data.roomId);
        toast.success("You are now friends", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="card m-2" style={{ maxWidth: "18rem" }}>
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{email}</h6>
        {isContact ? null : loading ? (
          <div className="d-flex align-items-center justify-content-center">
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <button onClick={onCreateContact} className="btn btn-secondary">
            Add Friend
          </button>
        )}
      </div>
    </div>
  );
}

export default ChatUser;
