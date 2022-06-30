import React from "react";
import Post from "../components/Post";
import { useSelector } from "react-redux";
import Paginator from "./Paginator";

const Posts = () => {
  const { posts, loading, error } = useSelector((state) => state.posts);

  return (
    <div className="col-md-7 d-flex flex-column justify-content-center align-items-center">
      {loading ? (
        <div className="spinner-border text-success" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        posts.length > 0 &&
        posts.map((post) => <Post key={post._id} post={post} />)
      )}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <Paginator />
    </div>
  );
};

export default Posts;
