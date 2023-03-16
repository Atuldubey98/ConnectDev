import React from "react";
import Post from "../components/Post";
import { useSelector } from "react-redux";
import Paginator from "./Paginator";

const Posts = () => {
  const { posts, loading, error } = useSelector((state) => state.posts);

  return (
    <div className="col-md-7 col rod-flex flex-column justify-content-center align-items-center">
      {loading ? (
        <div className="d-flex justify-content-center align-items-center">
          <div className="spinner-border text-success" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : posts.length > 0 ? (
        posts.map((post) => <Post key={post._id} post={post} />)
      ) : (
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ height: "10rem" }}
        >
          <p className="text-secondary text-center">
            Add Friends to from Search
          </p>
        </div>
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
