import avatar from "../assets/User-avatar.svg.png";
import useDate from "../hooks/useDate";
const Comment = ({ comment }) => {
  const { user, text, date } = comment;
  const { toStringDate } = useDate(new Date(date));
  const commentDate = toStringDate();
  return (
    <div className="card mb-2">
      <div className="card-body">
        <div className="d-flex flex-start align-items-center">
          <img
            style={{ cursor: "pointer", objectFit: "contain" }}
            className="rounded-circle shadow-1-strong me-3"
            src={user.avatar ? "http://localhost:9000" + user.avatar : avatar}
            alt="avatar"
            width="60"
            height="60"
          />
          <div className="ml-2">
            <h6 className="fw-bold text-primary mb-1">{user.name}</h6>
            <p className="text-muted small mb-0">{commentDate}</p>
          </div>
        </div>

        <p className="m-1 mb-1">{text}</p>
      </div>
    </div>
  );
};
export default Comment;
