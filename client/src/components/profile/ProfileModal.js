import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import avatar from "../../assets/User-avatar.svg.png";
import classnames from "classnames";
import { updateProfilePicture } from "../../redux/actions/profileActions";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const ProfileModal = () => {
  const { user, profilePicLoading } = useSelector((state) => state.user);
  const [profilePhoto, setProfilePhoto] = useState();
  const [picked, setPicked] = useState(false);
  const [show, setShow] = useState(false);
  const nameRef = useRef();
  const dispatch = useDispatch();
  function onSubmit(e) {
    e.preventDefault();
    if (picked) {
      dispatch(
        updateProfilePicture(
          profilePhoto,
          nameRef.current.value,
          toggleModal,
          showToast
        )
      );
      setShow(false);
    }
  }
  function showToast(message) {
    toast.success(message, {
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
  function toggleModal() {
    setShow(false);
  }
  function onProfilePhotoChange(e) {
    setProfilePhoto(e.target.files[0]);
    setPicked(true);
  }

  return (
    <div
      className={classnames("modal fade", { show })}
      id="profileModal"
      tabIndex="-1"
      aria-labelledby="profileLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h3 className="modal-title fs-5" id="profileLabel">
              Profile
            </h3>
            <i
              aria-label="Close"
              data-bs-dismiss="modal"
              className="fa-solid fa-xmark"
              style={{ cursor: "pointer" }}
            />
          </div>
          <form onSubmit={onSubmit}>
            <div className="modal-body">
              <div className="mb-3 d-flex flex-column justify-content-center align-items-center">
                <img
                  src={
                    user.avatar ? "http://localhost:9000" + user.avatar : avatar
                  }
                  className="rounded-circle mx-auto d-block"
                  style={{ maxWidth: "10rem" }}
                  alt="Avatar"
                />
                <input
                  type="file"
                  id="avatar"
                  accept="image/png, image/gif, image/jpeg, image/svg"
                  onChange={onProfilePhotoChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="avatar" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  ref={nameRef}
                  defaultValue={user?.name}
                  className="form-control"
                />
              </div>
            </div>
            {profilePicLoading ? (
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
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
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
