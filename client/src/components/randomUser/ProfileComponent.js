import React, { useState } from "react";
import { useSelector } from "react-redux";
import avatar from "../../assets/User-avatar.svg.png";
import EducationTabBody from "../profile/EducationTabBody";
import ExperienceTabBody from "../profile/ExperienceTabBody";
import HandleTabBody from "../profile/HandleTabBody";
import SkillTabBody from "../profile/SkillTabBody";
import StatusBody from "../profile/StatusBody";

function ProfileComponent() {
  const { ranProfile, ranProfileLoading } = useSelector(
    (state) => state.ranProfile
  );
  const { user } = useSelector((state) => state.user);
  let {
    skills,
    handle,
    status,
    experience,
    education,
    user: ranUser,
  } = ranProfile;

  function onCopyProfile() {
    navigator.clipboard.writeText(
      window.location.origin + "/random-user/" + ranProfile.user
    );
  }
  const profileNav = ["Skills", "Experience", "Education", "Handle", "Status"];
  const [tabIndex, setTabIndex] = useState(0);
  function onChangeTabIndex(index) {
    setTabIndex(index);
  }
  const profileTabsBody = [
    <SkillTabBody skills={skills} sameUser={ranUser.email === user.email} />,
    <ExperienceTabBody
      experience={experience}
      sameUser={ranUser.email === user.email}
    />,
    <EducationTabBody
      education={education}
      sameUser={ranUser.email === user.email}
    />,
    <HandleTabBody handle={handle} sameUser={ranUser.email === user.email} />,
    <StatusBody status={status} sameUser={ranUser.email === user.email} />,
  ];
  return (
    <div className="container col">
      <div className="d-flex align-items-center justify-content-center bg-light p-3 rounded">
        <img
          data-toggle="tooltip"
          data-placement="top"
          title="Click to copy profile link"
          src={
            ranUser.avatar ? "http://localhost:9000" + ranUser.avatar : avatar
          }
          className="rounded-circle mr-1 border border-5 border-success"
          style={{ maxWidth: "100px", cursor: "pointer" }}
          alt="Avatar"
          onClick={onCopyProfile}
        />
        <div className="container">
          <h3 className="fs-3 text-capitalize">{ranUser?.name}</h3>
          {status ? status : null}
          <h3 className="fs-3">{ranUser?.email}</h3>
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
      {ranProfileLoading ? (
        <div className="d-flex align-items-center justify-content-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="container">{profileTabsBody[tabIndex]}</div>
      )}
    </div>
  );
}

export default ProfileComponent;
