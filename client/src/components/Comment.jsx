import avatar from "../assets/User-avatar.svg.png";
const Comment = ({ comment }) => {
  const { user, text, date } = comment;
  const getFullDate = () => {
    return `${new Date(date).getDate().toString()} /
      ${new Date(date).getMonth().toString()} /
      ${new Date(date).getFullYear().toString()}`;
  };

  return (
    <div className="card mb-2">
      <div className="card-body">
        <div className="d-flex flex-start align-items-center">
          <img
            style={{ cursor: "pointer" }}
            className="rounded-circle shadow-1-strong me-3"
            src={user.avatar ? "http://localhost:9000" + user.avatar : avatar}
            alt="avatar"
            width="60"
            height="60"
          />
          <div className="ml-2">
            <h6 className="fw-bold text-primary mb-1">{user.name}</h6>
            <p className="text-muted small mb-0">{getFullDate()}</p>
          </div>
        </div>

        <p className="mt-3 mb-4 pb-2">{text}</p>
      </div>
    </div>
  );
};
export default Comment;
