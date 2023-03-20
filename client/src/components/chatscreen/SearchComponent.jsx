import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import instance from "../../instance";
import {
  CHAT_USERS_ERROR,
  CHAT_USERS_LOADING,
  CHAT_USERS_RESET,
  CHAT_USERS_SUCCESS,
} from "../../redux/constants/chatUserConstants";
import ChatUser from "./ChatUser";

function SearchComponent() {
  const nameRef = useRef();
  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState(0);
  const { users } = useSelector((state) => state.chatUser);

  const { data: chatUsers, loading, error } = users;
  const [meta, setMeta] = useState({
    totalPages: 0,
    totalCount: 0,
    currentPage: 0,
    currentTotal: 0,
  });
  const fetchUsers = useCallback(async () => {
    if (nameRef.current.value !== "") {
      const { value } = nameRef.current;
      try {
        dispatch({ type: CHAT_USERS_LOADING });
        const { data } = await instance.get("/api/users/all", {
          params: { search: value, page: pageNumber },
        });
        dispatch({ type: CHAT_USERS_SUCCESS, payload: data.users });
        if (data.users.length === 0) {
          throw new Error("");
        }
        setMeta(data.meta);
      } catch (error) {
        dispatch({ type: CHAT_USERS_ERROR, payload: `No user found !` });
      }
    }
  }, [dispatch, pageNumber]);

  useEffect(() => {
    fetchUsers();
  }, [pageNumber, fetchUsers]);
  function onPageNumberChange() {
    if (meta.totalPages > meta.currentPage) {
      setPageNumber((p) => p + 1);
    }
  }
  function onSubmit(e) {
    e.preventDefault();
    dispatch({ type: CHAT_USERS_RESET });
    fetchUsers();
  }
  return (
    <div className="mt-1 d-flex flex-column">
      <form onSubmit={onSubmit} className="d-flex">
        <input
          ref={nameRef}
          type="text"
          name="search"
          className="form-control"
        />
        <button className="btn btn-dark">Search</button>
      </form>
      <div className="d-flex flex-wrap mt-1">
        {chatUsers.map((user) => (
          <ChatUser {...user} key={user._id} />
        ))}
      </div>
      <div className="d-flex align-items-center justify-content-center m-1">
        {meta.totalPages > meta.currentPage ? (
          loading ? (
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <button className="btn btn-primary" onClick={onPageNumberChange}>
              SHOW MORE
            </button>
          )
        ) : null}
      </div>
      {error !== "" ? (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      ) : null}
    </div>
  );
}

export default SearchComponent;
