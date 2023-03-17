import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { EDUCATION_ADD } from "../../redux/constants/profileConstants";
import uuid from "react-uuid";
function EducationModal() {
  const initialEdu = {
    degree: "",
    area: "",
    school: "",
    fromDate: "",
    toDate: "",
    description: "",
  };
  const dispatch = useDispatch();
  const [education, setEducation] = useState(initialEdu);
  function onSubmit(e) {
    e.preventDefault();
    const { fromDate, toDate, ...other } = education;
    dispatch({
      type: EDUCATION_ADD,
      payload: { ...other, _id: uuid(), dates: `${fromDate} - ${toDate}` },
    });
    setEducation(initialEdu);
  }
  function onChange(e) {
    const { name, value } = e.target;
    setEducation({ ...education, [name]: value });
  }
  return (
    <div
      className="modal fade"
      id="educationModal"
      tabIndex="-1"
      aria-labelledby="educationLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h3 className="modal-title fs-5" id="educationLabel">
              Education
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
              <div className="mb-3">
                <label htmlFor="degree" className="form-label">
                  Degree
                </label>
                <input
                  type="text"
                  required
                  value={education.degree}
                  className="form-control"
                  id="degree"
                  name="degree"
                  onChange={onChange}
                  aria-describedby="degree"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="area" className="form-label">
                  Area
                </label>
                <input
                  type="text"
                  required
                  value={education.area}
                  name="area"
                  onChange={onChange}
                  className="form-control"
                  id="area"
                  aria-describedby="area"
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
                    value={education.fromDate}
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
                    value={education.toDate}
                    onChange={onChange}
                    className="form-control"
                    name="toDate"
                    aria-describedby="toDate"
                  />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="school" className="form-label">
                  School
                </label>
                <input
                  type="text"
                  required
                  className="form-control"
                  value={education.school}
                  name="school"
                  onChange={onChange}
                  aria-describedby="school"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  type="text"
                  value={education.description}
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
}

export default EducationModal;
