import avatar from "../assets/User-avatar.svg.png";

const Comment = ({ comment }) => {
  const { user, text, date } = comment;
  const getFullDate = () => {
    return `${new Date(date).getDate().toString()} /
      ${new Date(date).getMonth().toString()} /
      ${new Date(date).getFullYear().toString()}`;
  };
  return (
    <div className="d-flex flex-start bg-white rounded p-1 m-1 border-success">
      <img
        src={user.avatar ? "http://localhost:9000" + user.avatar : avatar}
        className="rounded-circle mr-1 border border-5 border-success"
        style={{ width: "30px", height: "30px", cursor: "pointer" }}
        alt="Avatar"
      />
      <div>
        <h6 className="font-weight-bolder">{user && user?.name}</h6>
        <div className="d-flex justify-content-center align-items-center">
          <p className="font-weight-bold">
            {date ? getFullDate() : "March 2 2021"}
          </p>
        </div>
        <p className="">{text}</p>
      </div>
    </div>
  );
};
export default Comment;
