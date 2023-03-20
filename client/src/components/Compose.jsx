import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useValidate from "../hooks/useValidate";
import { addPost } from "../redux/actions/postActions";

const Compose = () => {
  const [text, setText] = useState("");
  const { item, loading, error } = useSelector((state) => state.item);

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
  const { validate, validationError } = useValidate("compose", {
    header,
    text,
  });
  const defaultErrorMsg = { header: null, text: null };
  const [errorMsg, setErrorMsg] = useState(defaultErrorMsg);

  const onComposeSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setErrorMsg(validationError);
      setTimeout(() => {
        setErrorMsg(defaultErrorMsg);
      }, 2000);
      return;
    }
    dispatch(addPost({ title, text, header, subtitle, color }));
  };
  const handlePreview = (e) => {
    e.preventDefault();
    setPreview((p) => !p);
  };
  const resetCompose = (e) => {
    e.preventDefault();
    setText("");
    setHeader("");
    setTitle("");
    setColor("");
    setPreview("");
  };
  const colorOptions = [
    { value: "", text: "Open this select menu" },
    { value: "bg-primary", text: "Blue" },
    { value: "bg-secondary", text: "Grey" },
    { value: "bg-success", text: "Green" },
    { value: "bg-danger", text: "Red" },
    { value: "bg-warning", text: "Yellow" },
    { value: "bg-info", text: "Information" },
    { value: "bg-light", text: "Light" },
    { value: "bg-dark", text: "Dark" },
  ];
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
              <div className="w-100">
                <textarea
                  disabled={loading}
                  placeholder="Enter header here"
                  className="form-control w-100"
                  value={header}
                  onChange={onHeaderChange}
                  style={{
                    border: "none",
                  }}
                />
                {errorMsg.header ? (
                  <small className="form-text text-danger">
                    {errorMsg.header}
                  </small>
                ) : null}
              </div>
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
            <div className="card-text">
              {preview ? (
                text
              ) : (
                <div className="w-100">
                  <textarea
                    disabled={loading}
                    className="w-100 form-control"
                    value={text}
                    onChange={onTextChange}
                    placeholder="Enter text here"
                  />
                  {errorMsg.text ? (
                    <small className="form-text text-danger">
                      {errorMsg.text}
                    </small>
                  ) : null}
                </div>
              )}
            </div>
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
              {colorOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.text}
                </option>
              ))}
            </select>
            <button type="submit" className={"btn btn-success"}>
              {"Save"}
            </button>
            <input
              type="reset"
              className={"btn btn-danger"}
              value={"Reset"}
              onClick={resetCompose}
            />
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
