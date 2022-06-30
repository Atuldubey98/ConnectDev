import React from "react";
const Post = ({ post }) => {
  const { text, likes, comments } = post;
  return (
    <div className="card m-2">
      <h5 className="card-header font-weight-bold">Card-title</h5>
      <p className="card-body">{text}</p>
      <div className="card-footer">
        <button className="btn btn-primary card-link">Open</button>
        <i className="fa-solid fa-heart card-link"></i>
        <span className="m-2">{likes.length}</span>
        <i className="fa-solid fa-comment card-link"></i>
        <span className="m-2">{comments.length}</span>
      </div>
    </div>
  );
};
export default Post;
