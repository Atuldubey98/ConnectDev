import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../redux/actions/postActions";

const Compose = () => {
  const [text, setText] = useState("");
  const { item, loading, error } = useSelector((state) => state.item);
  console.log(loading);
  const [header, setHeader] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("");
  const [preview, setPreview] = useState(false);
  const dispatch = useDispatch();
  const onHeaderChange = (e) => {
    setHeader(e.target.value);
  };
  const onTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const onSubtitleChange = (e) => {
    setSubtitle(e.target.value);
  };
  const onTextChange = (e) => {
    setText(e.target.value);
  };
  const handleColorChange = (e) => {
    setColor(e.target.value);
  };
  const onComposeSubmit = (e) => {
    e.preventDefault();
    dispatch(addPost({ title, text, header, subtitle, color }));    
  };
  const handlePreview = (e) => {
    e.preventDefault();
    setPreview((p) => !p);
  };
  return (
    <div className="col-md-7">
      <form onSubmit={onComposeSubmit}>
        <div
          className={
            color === "" ? "card m-2 w-100" : "card m-2 w-100 " + color
          }
        >
          <div className="card-header d-flex justify-content-between align-items-center">
            {preview ? (
              <span className="font-weight-bold">{header}</span>
            ) : (
              <textarea
                disabled={loading}
                placeholder="Enter header here"
                className="form-control"
                value={header}
                onChange={onHeaderChange}
                style={{
                  border: "none",
                }}
              />
            )}
          </div>
          <div className="card-body">
            <h5 className="card-title">
              {preview ? (
                title
              ) : (
                <textarea
                  disabled={loading}
                  className="form-control"
                  value={title}
                  onChange={onTitleChange}
                  placeholder="Enter title here"
                />
              )}
            </h5>
            <h6 className="card-subtitle mb-2 text-muted">
              {preview ? (
                subtitle
              ) : (
                <textarea
                  disabled={loading}
                  className="form-control"
                  value={subtitle}
                  onChange={onSubtitleChange}
                  placeholder="Enter subtitle here"
                />
              )}
            </h6>
            <p className="card-text">
              {preview ? (
                text
              ) : (
                <textarea
                  disabled={loading}
                  className="form-control"
                  value={text}
                  onChange={onTextChange}
                  placeholder="Enter text here"
                />
              )}
            </p>
          </div>
          <div className="card-footer d-flex align-items-center justify-content-around">
            <button
              disabled={loading}
              onClick={handlePreview}
              className={
                preview ? "btn card-link" : "btn card-link btn-secondary"
              }
            >
              {preview ? "Edit" : "Preview"}
            </button>
            <select
              defaultValue={""}
              onChange={handleColorChange}
              className="custom-select"
            >
              <option value={""}>Open this select menu</option>
              <option value="bg-primary">Blue</option>
              <option value="bg-secondary">Grey</option>
              <option value="bg-success">Green</option>
              <option value="bg-danger">Red</option>
              <option value="bg-warning">Yellow</option>
              <option value="bg-info">Information</option>
              <option value="bg-light">Light</option>
              <option value="bg-dark">Dark</option>
            </select>
            <button type="submit" className={"btn btn-success"}>
              {"Save"}
            </button>
          </div>
        </div>
        {item && (
          <div className="alert alert-success" role="alert">
            {"Posted !"}
          </div>
        )}
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
      </form>
    </div>
  );
};

export default Compose;
