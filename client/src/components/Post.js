import React, { useState } from "react";
import { useSelector } from "react-redux";
import { likePost } from "../redux/actions/postActions";
import { Link } from "react-router-dom";
const Post = ({ post }) => {
  const { text, likes, comments, title, subtitle, header, color } = post;
  const [show, setShow] = useState(false);
  const { user } = useSelector((state) => state.user);

  const [loading, setLoading] = useState(false);
  const [liked, setLiked] = useState(
    likes.filter((like) => like.user === user._id).length > 0
  );
  const [length, setLength] = useState(likes.length);
  const likeThePost = async () => {
    try {
      setLoading(true);
      const res = await likePost(post._id);
      setLoading(false);
      setLiked(res);
      setLength((len) => (len += res ? 1 : -1));
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className={color ? "card m-2 w-100 " + color : "card m-2 w-100 "}>
      <div className="card-header d-flex justify-content-between align-items-center">
        {header && <span className="font-weight-bold">{header}</span>}
      </div>

      <div className="card-body">
        {title && <h5 className="card-title">{title}</h5>}
        {subtitle && (
          <h6 className="card-subtitle mb-2 text-muted">{subtitle}</h6>
        )}
        <p className="card-tex">{text}</p>
      </div>
      <div className="card-footer d-flex align-items-center justify-content-around">
        <button className="btn btn-primary card-link">
          <span>Open</span>
        </button>
        <div className="dropdown">
          <button
            className="btn btn-light card-link"
            onClick={() => setShow((o) => !o)}
          >
            <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
          </button>
          <div
            className={show ? "dropdown-menu show" : "dropdown-menu"}
            aria-labelledby="dropdownMenuButton"
          >
            {user._id === post.user && (
              <div>
                <Link className="dropdown-item" to="#">
                  <i className="fa-solid fa-pen-to-square"></i>
                  <span className="ml-2">Edit</span>
                </Link>
                <Link className="dropdown-item" to="#">
                  <i className="fa-solid fa-trash"></i>
                  <span className="ml-2">Delete</span>
                </Link>
              </div>
            )}
            <Link className="dropdown-item" to="#">
              <i className="fa-solid fa-user"></i>
              <span className="ml-2">Take me to profle</span>
            </Link>
          </div>
        </div>
        {loading ? (
          <div className="spinner-border text-success" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <button
            onClick={likeThePost}
            className="m-2 btn btn-light font-weight-bold"
          >
            <i
              style={{
                color: liked ? "red" : "lightGrey",
              }}
              className="fa-solid fa-heart card-link mr-2"
            ></i>
            {length}
          </button>
        )}
        <button className="m-2 btn btn-light font-weight-bold">
          <i
            style={{
              color: "blueviolet",
            }}
            className="fa-solid fa-comment card-link mr-2"
          ></i>
          {comments.length}
        </button>
      </div>
    </div>
  );
};
export default Post;
