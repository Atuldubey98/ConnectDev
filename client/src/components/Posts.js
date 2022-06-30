import React from "react";
import Post from "../components/Post";
import { useSelector } from "react-redux";

const Posts = () => {
  const { posts, loading, error } = useSelector((state) => state.posts);

  return (
    <div className="col-md-7">
      {loading ? (
        <div>Loading</div>
      ) : (
        posts.length > 0 &&
        posts.map((post) => <Post key={post._id} post={post} />)
      )}
      {error && <div>{error}</div>}
    </div>
  );
};

export default Posts;
