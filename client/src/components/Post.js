import React from "react";
const Post = ({ post }) => {
  const { text, likes, comments } = post;
  return (
    <div className="card m-2 w-100">
      <h5 className="card-header font-weight-bold">Card-title</h5>

      <div className="card-body">
        <h5 className="card-title">Card title</h5>
        <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
        <p className="card-tex">{text}</p>
      </div>
      <div className="card-footer d-flex align-items-center justify-content-around">
        <button className="btn btn-primary card-link">
          <span>Open</span>
        </button>

        <span className="m-2">
          <i className="fa-solid fa-heart card-link mr-2"></i>
          {likes.length}
        </span>

        <span className="m-2">
          <i className="fa-solid fa-comment card-link mr-2"></i>
          {comments.length}
        </span>
      </div>
    </div>
  );
};
export default Post;
