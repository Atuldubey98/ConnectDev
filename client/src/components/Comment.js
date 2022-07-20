const Comment = ({ comment }) => {
  const { user, text, date } = comment;
  return (
    <div className="d-flex flex-start bg-white rounded p-2 m-2 border-success">
      <img
        className="rounded-circle shadow-1-strong me-3"
        src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(23).webp"
        alt="avatar"
        width="60"
        height="60"
      />
      <div>
        <h6 className="fw-bold mb-1">{user && user?.name}</h6>
        <div className="d-flex align-items-center mb-3">
          <p className="mb-0">
            {date ? date : "March 2 2021"}
            <span className="btn btn-danger">Delete</span>
          </p>
        </div>
        <p className="mb-0">{text}</p>
      </div>
    </div>
  );
};
export default Comment;
