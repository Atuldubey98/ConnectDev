export default function EditPostModal({ post, showModal, onShowModal }) {
  const { _id } = post;
  const className = showModal ? "modal fade show" : "modal fade";
  const style = showModal ? { display: "block" } : { display: "none" };
  return (
    <div
      className={className}
      id={_id}
      style={style}
      tabindex="-1"
      aria-labelledby={`${_id}label`}
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id={`${_id}label`}>
              Modal title
            </h1>
            <button
              onClick={onShowModal}
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <i
                aria-label="Close"
                data-bs-dismiss="modal"
                className="fa-solid fa-xmark"
                style={{ cursor: "pointer" }}
              />
            </button>
          </div>
          <div className="modal-body">...</div>
          <div className="modal-footer">
            <button
              type="button"
              onClick={onShowModal}
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" className="btn btn-primary">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
