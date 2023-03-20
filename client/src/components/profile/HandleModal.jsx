import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { HANDLE_ADD } from "../../redux/constants/profileConstants";
import uuid from "react-uuid";
function HandleModal() {
  const initialHandle = { username: "", link: "", platform: "" };
  const [handle, setHandle] = useState(initialHandle);
  const dispatch = useDispatch();
  function onSubmit(e) {
    e.preventDefault();
    dispatch({ type: HANDLE_ADD, payload: { ...handle, _id: uuid() } });
  }
  const onChange = (e) => {
    const { name, value } = e.target;
    setHandle({ ...handle, [name]: value });
  };
  return (
    <div
      className="modal fade"
      id="handleModal"
      tabIndex="-1"
      aria-labelledby="handleLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="handleLabel">
              Handle
            </h1>
            <i
              aria-label="Close"
              data-bs-dismiss="modal"
              className="fa-solid fa-xmark"
              style={{ cursor: "pointer" }}
            />
          </div>
          <form onSubmit={onSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  username
                </label>
                <input
                  type="text"
                  value={handle.username}
                  className="form-control"
                  id="username"
                  name="username"
                  onChange={onChange}
                  aria-describedby="username"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="link" className="form-label">
                  Link to Profile
                </label>
                <input
                  type="url"
                  required
                  value={handle.link}
                  name="link"
                  onChange={onChange}
                  className="form-control"
                  id="link"
                  aria-describedby="link"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="link" className="form-label">
                  Platform
                </label>
                <input
                  type="text"
                  value={handle.platform}
                  name="platform"
                  onChange={onChange}
                  className="form-control"
                  id="link"
                  aria-describedby="link"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="submit"
                data-bs-dismiss="modal"
                className="btn btn-primary"
              >
                Save changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default HandleModal;
