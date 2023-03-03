import "bootstrap/dist/js/bootstrap";
import React from "react";
import ExperienceModal from "./ExperienceModal";
function ExperienceTabBody({ experience, sameUser }) {
  
  return (
    <div className="container mb-3 mt-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="card-title">Experience</h5>
        {sameUser ? (
          <button
            data-bs-toggle="modal"
            data-bs-target="#experienceModal"
            className="btn btn-dark"
          >
            Add Experience
          </button>
        ) : null}
      </div>
      {experience.map(({ company, title, description, _id }) => (
        <div key={_id} className="card">
          <div className="card-body">
            <h5 className="card-title">{company}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{title}</h6>
            <p className="card-text">{description}</p>
            <div className="d-flex justify-content-between"></div>
          </div>
        </div>
      ))}
      <ExperienceModal />
    </div>
  );
}

export default ExperienceTabBody;
