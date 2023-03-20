import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SocketContext } from "../../context/SocketContext";
import instance from "../../instance";
import {
  CHATS_ERROR,
  CHATS_LOADING,
  CHATS_RESET,
  CHATS_SUCCESS,
} from "../../redux/constants/chatConstants";
import {
  RESET_ACTIVE_ROOM_ID,
  SET_ACTIVE_ROOM_ID,
} from "../../redux/constants/chatUserConstants";
import MessageComponent from "./MessageComponent";
function ChatsComponent({ onSetShow, roomChat }) {
  const { sendMsgOnSocket, messageRef } = useContext(SocketContext);
  const { messages, loading } = useSelector((state) => state.chats);
  const { user: currentUser } = useSelector((state) => state.user);
  const { users } = roomChat;
  const [msgBody, setMsgBody] = useState("");
  const inputRef = useRef();
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      dispatch({ type: CHATS_LOADING });
      dispatch({ type: SET_ACTIVE_ROOM_ID, payload: roomChat._id });
      try {
        const { data } = await instance.get(`/api/chat/chats/${roomChat._id}`);
        dispatch({
          type: CHATS_SUCCESS,
          payload: { messages: data.messages, roomId: roomChat._id },
        });
        setTimeout(() => {
          messageRef.current.scrollIntoView({ behavior: "smooth" });
          inputRef.current.focus();
        }, 100);
      } catch (error) {
        dispatch({ type: CHATS_ERROR, payload: "No Chats found" });
      }
    })();
    return () => {
      dispatch({ type: RESET_ACTIVE_ROOM_ID });
      dispatch({ type: CHATS_RESET });
    };
  }, [dispatch, roomChat._id]);
  const onSubmit = (e) => {
    e.preventDefault();
    sendMsgOnSocket({ msgBody, room: roomChat });
    setMsgBody("");
  };
  function onChange(e) {
    const { value } = e.target;
    setMsgBody(value);
  }

  return (
    <div className="container-md shadow-sm p-3">
      <div className="d-flex align-items-center mt-1 bg-primary text-white rounded p-2">
        <i
          className="fa-solid fa-left-long btn text-white"
          onClick={onSetShow}
        />
        <h4 className="font-weight-bolder ">{users[0].name}</h4>
      </div>
      <div
        style={{ height: "65vh" }}
        className="container-md col overflow-auto "
      >
        {loading ? (
          <div className="d-flex justify-content-center align-items-center pt-5">
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="pl-2 pr-2">
            {messages.map((message) => {
              const sameUser = message.user._id === currentUser._id;
              return (
                <MessageComponent
                  key={message._id}
                  message={message}
                  sameUser={sameUser}
                />
              );
            })}
            <div
              className="dummy"
              ref={messageRef}
            ></div>
          </div>
        )}
      </div>
      <form onSubmit={onSubmit} className="mt-1 d-flex flex-direction">
        <input
          autoComplete="false"
          name="messsage"
          id="msgBody"
          ref={inputRef}
          value={msgBody}
          onChange={onChange}
          className="form-control flex-8"
        />
        <button
          type="submit"
          disabled={msgBody.length === 0}
          className="flex-4 btn btn-primary"
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default ChatsComponent;
