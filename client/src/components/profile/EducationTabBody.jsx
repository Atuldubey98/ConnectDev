import EducationModal from "./EducationModal";

function EducationTabBody({ education, sameUser }) {
  return (
    <div className="container mt-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="card-title">Education</h5>
        {sameUser && (
          <button
            data-bs-toggle="modal"
            data-bs-target="#educationModal"
            className="btn btn-dark"
          >
            Add Education
          </button>
        )}
      </div>
      <div className="mt-3">
        {education.map(({ degree, _id, area, description, school, dates }) => (
          <div key={_id} className="card mb-3">
            <div className="card-body">
              <h4 className="card-title">
                <string>
                  {degree || ""} {area || ""}
                </string>
              </h4>

              <h6 className="card-subtitle text-muted">
                {school || ""} <span className="font-weight-bold">{dates}</span>
              </h6>
              <p className="card-text">{description || ""}</p>
            </div>
          </div>
        ))}
      </div>
      <EducationModal />
    </div>
  );
}

export default EducationTabBody;
