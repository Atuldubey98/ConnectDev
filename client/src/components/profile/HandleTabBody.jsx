import React from "react";
import HandleModal from "./HandleModal";

function HandleTabBody({ handle, sameUser }) {
  return (
    <div className="container mb-3 mt-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="card-title">Handle</h5>
        {sameUser && (
          <button
            data-bs-toggle="modal"
            data-bs-target="#handleModal"
            className="btn btn-dark"
          >
            Add Handle
          </button>
        )}
      </div>
      {handle.map(({ link, platform, username, _id }) => (
        <div className="card mb-3" key={_id}>
          <div className="card-body">
            <a className="card-title" href={link}>
              {link}
            </a>
            <p className="card-subtitle">{username}</p>
            <p className="card-text">{platform}</p>
          </div>
        </div>
      ))}
      <HandleModal />
    </div>
  );
}

export default HandleTabBody;
