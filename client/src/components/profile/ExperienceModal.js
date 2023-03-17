import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { EXP_ADD } from "../../redux/constants/profileConstants";
import uuid from "react-uuid";

const ExperienceModal = () => {
  const defaultExp = {
    title: "",
    company: "",
    fromDate: "",
    toDate: "",
    description: "",
    location: "",
  };
  const [exp, setExp] = useState(defaultExp);
  const onChange = (e) => {
    const { name, value } = e.target;
    setExp({ ...exp, [name]: value });
  };
  const dispatch = useDispatch();
  function onSubmit(e) {
    e.preventDefault();
    const { toDate, fromDate, ...other } = exp;
    dispatch({
      type: EXP_ADD,
      payload: { ...other, _id: uuid(), dates: `${fromDate} - ${toDate}` },
    });
    setExp(defaultExp);
  }
  return (
    <div
      className="modal fade"
      id="experienceModal"
      tabIndex="-1"
      aria-labelledby="experienceLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="experienceLabel">
              Experience
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
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  value={exp.title}
                  className="form-control"
                  id="title"
                  required
                  name="title"
                  onChange={onChange}
                  aria-describedby="title"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="company" className="form-label">
                  Company
                </label>
                <input
                  type="text"
                  required
                  value={exp.company}
                  name="company"
                  onChange={onChange}
                  className="form-control"
                  id="company"
                  aria-describedby="company"
                />
              </div>
              <div className="row mb-3 g-3">
                <div className="col">
                  <label htmlFor="fromDate" className="form-label">
                    From - Date
                  </label>
                  <input
                    type="date"
                    onChange={onChange}
                    value={exp.fromDate}
                    className="form-control"
                    name="fromDate"
                    aria-describedby="fromDate"
                  />
                </div>
                <div className="col">
                  <label htmlFor="toDate" className="form-label">
                    To - Date
                  </label>
                  <input
                    type="date"
                    value={exp.toDate}
                    onChange={onChange}
                    className="form-control"
                    name="toDate"
                    aria-describedby="toDate"
                  />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="location" className="form-label">
                  Location
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={exp.location}
                  name="location"
                  onChange={onChange}
                  aria-describedby="location"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  type="text"
                  value={exp.description}
                  onChange={onChange}
                  className="form-control"
                  id="description"
                  name="description"
                  aria-describedby="description"
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
};

export default ExperienceModal;
