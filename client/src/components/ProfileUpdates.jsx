import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProfile, getProfile } from "../redux/actions/profileActions";
import ExperienceTabBody from "./profile/ExperienceTabBody";
import ProfileModal from "./profile/ProfileModal";
import SkillTabBody from "./profile/SkillTabBody";
import "bootstrap/dist/js/bootstrap";
import EducationTabBody from "./profile/EducationTabBody";
import HandleTabBody from "./profile/HandleTabBody";
import StatusBody from "./profile/StatusBody";
import avatar from "../assets/User-avatar.svg.png";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

const ProfileUpdates = () => {
  const { user } = useSelector((state) => state.user);
  const { profile, loading } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);
  let { skills, handle, status, experience, education } = profile;
  skills.map((skill) => {
    return {
      ...skill,
      edit: false,
    };
  });
  const profileNav = ["Skills", "Experience", "Education", "Handle", "Status"];

  const profileTabsBody = [
    <SkillTabBody skills={skills} sameUser={true} />,
    <ExperienceTabBody experience={experience} sameUser={true} />,
    <EducationTabBody education={education} sameUser={true} />,
    <HandleTabBody handle={handle} sameUser={true} />,
    <StatusBody status={status} sameUser={true} />,
  ];
  const [tabIndex, setTabIndex] = useState(0);
  function onChangeTabIndex(index) {
    setTabIndex(index);
  }

  function onSubmit(e) {
    e.preventDefault();
    dispatch(addProfile(profile, showError));
  }
  function showError(message) {
    toast.error(message, {
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
  function onCopyProfile() {
    navigator.clipboard.writeText(
      window.location.origin + "/random-user/" + user._id
    );
  }
  return (
    <div className="container col">
      <div className="d-flex align-items-center justify-content-center bg-light p-3 rounded">
        <img
          data-toggle="tooltip"
          data-placement="top"
          title="Click to copy profile link"
          src={user.avatar ? "http://localhost:9000" + user.avatar : avatar}
          className="rounded-circle mr-1 border border-5 border-success"
          style={{ maxWidth: "100px", cursor: "pointer" }}
          alt="Avatar"
          onClick={onCopyProfile}
        />
        <div className="container">
          <h3 className="fs-3 text-capitalize">{user?.name}</h3>
          {status ? status : null}
          <h3 className="fs-3">{user?.email}</h3>
        </div>
        <div className="container">
          <button
            data-bs-toggle="modal"
            data-bs-target="#profileModal"
            className="btn btn-primary"
          >
            <i style={{ marginRight: 10 }} className="fa-solid fa-pencil"></i>
            Edit Profile
          </button>
        </div>
      </div>
      <div className="card text-center">
        <div className="card-header">
          <ul className="nav nav-tabs card-header-tabs">
            {profileNav.map((nav, index) => (
              <li
                style={{ cursor: "pointer" }}
                key={nav}
                className="nav-item"
                onClick={() => onChangeTabIndex(index)}
              >
                <span
                  className={`nav-link text-capitalize ${
                    index === tabIndex && "active"
                  }`}
                  to="#"
                  aria-disabled="true"
                >
                  {nav}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {loading ? (
        <div className="d-flex align-items-center justify-content-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="container">
          {profileTabsBody[tabIndex]}
          <div className="d-flex align-items-center justify-content-center">
            <button onClick={onSubmit} className="btn btn-success">
              Update
            </button>
          </div>
        </div>
      )}
      <ProfileModal />
      <ToastContainer />
    </div>
  );
};
export default ProfileUpdates;
