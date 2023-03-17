import React, { useEffect, useState } from "react";
import ChatsComponent from "./ChatsComponent";
import { useDispatch, useSelector } from "react-redux";
import instance from "../../instance";
import {
  ACTIVE_USERS_ERROR,
  ACTIVE_USERS_LOADING,
  ACTIVE_USERS_SUCCESS,
  SET_ACTIVE_ROOM_ID,
} from "../../redux/constants/chatUserConstants";
function ActiveComponent() {
  const [show, setShow] = useState(false);
  const { activeUsers } = useSelector((state) => state.chatUser);
  const { loading, data: active, error } = activeUsers;
  const [roomChat, setRoomChat] = useState();
  const dispatch = useDispatch();
  function onSetShow() {
    setShow(!show);
  }

  useEffect(() => {
    (async () => {
      try {
        dispatch({ type: ACTIVE_USERS_LOADING });
        const { data } = await instance.get("/api/chat/contact");
        dispatch({ type: ACTIVE_USERS_SUCCESS, payload: data });
      } catch (e) {
        dispatch({ type: ACTIVE_USERS_ERROR, payload: "ERROR OCCURED" });
        setTimeout(() => {
          dispatch({ type: ACTIVE_USERS_ERROR, payload: "" });
        }, 1000);
      }
    })();
  }, [dispatch]);
  function onChangeChatUser(room) {
    if ("_id" in room) {
      setShow(!show);
      dispatch({ type: SET_ACTIVE_ROOM_ID, payload: room._id });
      setRoomChat(room);
    }
  }
  return (
    <div className="mt-1">
      {show ? (
        <ChatsComponent onSetShow={onSetShow} roomChat={roomChat} />
      ) : (
        <div className="container-md mt-1">
          {loading ? (
            <div className="d-flex  justify-content-center align-items-center">
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : active.length === 0 ? (
            <div
              className="d-flex align-items-center justify-content-center"
              style={{ height: "10rem" }}
            >
              <p className="text-secondary text-center">
                Add Friends to from Search
              </p>
            </div>
          ) : (
            <ul className="list-group">
              {active.map(({ room }) => {
                const { users } = room;
                return users.length === 1 ? (
                  <li
                    style={{ cursor: "pointer" }}
                    key={users[0]._id}
                    onClick={() => onChangeChatUser(room)}
                    className="list-group-item fw-bold"
                  >
                    {users[0] && users[0].avatar ? (
                      <img
                        src={"http://localhost:9000" + users[0].avatar}
                        className="rounded-circle mr-2"
                        style={{ width: "20px" }}
                        alt="Avatar"
                      />
                    ) : (
                      <i className="fa-solid fa-user mr-2"></i>
                    )}
                    <span>{`${users[0].name} - ${users[0].email}`}</span>
                  </li>
                ) : (
                  <li className="list-group-item">
                    <span></span>
                  </li>
                );
              })}
            </ul>
          )}
          {error ? (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}

export default ActiveComponent;
