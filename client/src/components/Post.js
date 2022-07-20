import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Comment from "./Comment";
import {
  deletePost,
  likePost,
  postComment,
} from "../redux/actions/postActions";
const Post = ({ post }) => {
  const bottomRef = useRef(null);
  const { text, likes, comments, title, subtitle, header, color } = post;
  const [isDeleted, setIsDeleted] = useState(color);
  const [commentText, setCommentText] = useState("");
  const handleCommentTextChange = (e) => {
    setCommentText(e.target.value);
  };
  const [show, setShow] = useState(false);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [liked, setLiked] = useState(
    likes.filter((like) => like.user._id === user._id).length > 0
  );
  const [loadedComments, setLoadedComments] = useState(comments);
  const [loadingComments, setLoadingComments] = useState(false);
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

  const commentOnPost = async (e) => {
    try {
      e.preventDefault();
      setLoadingComments(true);
      const res = await postComment(post._id, commentText);
      setLoadedComments((c) => [...c, res]);
      setLoadingComments(false);
      setCommentText("");
    } catch (e) {
      console.log(e);
    }
  };
  const deleteSinglePost = () => {
    setShow((o) => !o);
    dispatch(deletePost(post._id));
    setIsDeleted("bg-secondary");
  };
  const [showComments, setShowComments] = useState(false);
  const scrollToBottomWithSmoothScroll = () => {
    bottomRef?.current?.scrollTo({
      top: bottomRef.current.scrollHeight,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    scrollToBottomWithSmoothScroll();
  }, [loadedComments, showComments]);
  return (
    <div
      className={isDeleted ? "card m-2 w-100 " + isDeleted : "card m-2 w-100 "}
    >
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
                <div className="dropdown-item btn" to="#">
                  <i className="fa-solid fa-pen-to-square"></i>
                  <span className="ml-2">Edit</span>
                </div>
                <div
                  onClick={deleteSinglePost}
                  className="dropdown-item btn"
                  to="#"
                >
                  <i className="fa-solid fa-trash"></i>
                  <span className="ml-2">Delete</span>
                </div>
              </div>
            )}
            <div className="dropdown-item btn" to="#">
              <i className="fa-solid fa-user"></i>
              <span className="ml-2">Take me to profle</span>
            </div>
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
        <div className="btn-group">
          <button className="btn btn-light font-weight-bold">
            <i
              style={{
                color: "blueviolet",
              }}
              className="fa-solid fa-comment card-link mr-2"
            ></i>
            {loadedComments.length}
          </button>
          <button
            onClick={() => {
              setShowComments((c) => !c);
            }}
            className="btn btn-light font-weight-bold"
          >
            <i
              style={{
                color: "blueviolet",
              }}
              className="fa-solid fa-pen-to-square"
            ></i>
          </button>
        </div>
      </div>
      {showComments && (
        <div className="card-footer">
          <div
            style={{ maxHeight: "50vh" }}
            ref={bottomRef}
            className="d-flex flex-column overflow-auto"
          >
            {loadedComments.map((comment) => (
              <Comment key={comment._id} comment={comment} />
            ))}
          </div>
          <form className="d-flex flex-column justify-content-center align-items-center">
            <textarea
              placeholder="Write your comment here"
              type="text"
              className="form-control"
              value={commentText}
              onChange={handleCommentTextChange}
            />
            <button
              disabled={loadingComments}
              onClick={commentOnPost}
              className="btn btn-success mt-2"
            >
              Comment
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
export default Post;
