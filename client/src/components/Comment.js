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
        className="rounded-circle shadow-1-strong mr-2"
        src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(23).webp"
        alt="avatar"
        width="30"
        height="30"
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
