import React from "react";
import classNames from "classnames";
function MessageComponent({ message, sameUser }) {
  const { msgBody, user } = message;
  return (
    <div
      className={classNames("row d-flex align-items-center mt-1 mb-1", {
        "justify-content-end": !sameUser,
        "justify-content-start": sameUser,
      })}
    >
      <div className="mb-1 p-1 " style={{ maxWidth: "90%" }}>
        {user && user.avatar ? (
          <img
            src={"http://localhost:9000" + user.avatar}
            className="rounded-circle mr-2"
            style={{ width: "20px" }}
            alt="Avatar"
          />
        ) : (
          <i className="fa-solid fa-user mr-2"></i>
        )}
      </div>
      <div
        className={classNames("p-2  rounded", {
          "bg-info": !sameUser,
          "bg-warning": sameUser,
        })}
      >
        <p>{msgBody}</p>
      </div>
    </div>
  );
}

export default MessageComponent;
