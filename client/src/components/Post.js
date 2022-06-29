import { Link } from "react-router-dom";
import React from "react";
const Post = () => {
  return (
    <div className="card m-2">
      <div className="card-body">
        <h5 className="card-title">Card-title</h5>
        <p className="card-text">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias nihil
          dicta officia itaque assumenda, accusantium laudantium iure quo,
          provident repellendus reprehenderit, modi omnis ut. Quibusdam sequi
          nobis qui ab dicta?
        </p>
        <Link to="#">
          <button className="btn btn-primary">Open</button>
        </Link>
      </div>
    </div>
  );
};
export default Post;
