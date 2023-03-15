import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../redux/actions/userActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useValidate from "../hooks/useValidate";
const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState({
    email: null,
    password: null,
    name: null,
  });
  const { validate, validationError } = useValidate("signUp", {
    name,
    email,
    password,
  });
  const onFormSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setErrorMsg(validationError);
    } else {
      dispatch(register(name, email, password, handleToast));
    }
  };
  function handleToast(info) {
    if (info.error) {
      toast.error(info.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      toast.success(info.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: '#a3ebb1'
      }}
      className="container-fluid d-flex justify-content-center align-items-center"
    >
      {loading ? (
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <form
          onSubmit={onFormSubmit}
          className="d-flex-column col-md-5 justify-content-center align-items-center border border-secondary p-5 bg-light rounded"
        >
          <div className="mb-3">
            <label
              htmlFor="exampleInputEmail1"
              className="form-label font-weight-bold"
            >
              Name
            </label>
            <input
              type="text"
              onChange={handleNameChange}
              className="form-control"
              id="name"
              required
              value={name}
              placeholder={"First Name + Last Name"}
              aria-describedby="name"
            />
            {errorMsg.name ? (
              <small className="form-text text-danger">{errorMsg.name}</small>
            ) : null}
          </div>
          <div className="mb-3">
            <label
              htmlFor="exampleInputEmail1"
              className="form-label font-weight-bold"
            >
              Email address
            </label>
            <input
              type="email"
              onChange={handleEmailChange}
              className="form-control"
              id="exampleInputEmail1"
              value={email}
              required
              placeholder={"user@example.com"}
              aria-describedby="emailHelp"
            />
            {errorMsg.email ? (
              <small className="form-text text-danger">
                {errorMsg.email}
              </small>
            ) : null}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label font-weight-bold">
              Password
            </label>
            <input
              type="password"
              placeholder={"Password"}
              value={password}
              required
              onChange={handlePasswordChange}
              className="form-control"
              id="exampleInputPassword1"
            />
            {errorMsg.password ? (
              <small className="form-text text-danger">
                {errorMsg.password}
              </small>
            ) : null}
          </div>
          <div className=" mb-3 d-flex flex-column justify-content-around align-items-center">
            <button type="submit" className="btn btn-success">
              Sign up
            </button>
            <Link to="/login">Already have an Account ? Login !</Link>
          </div>
          {error && error.data && (
            <div className="alert alert-danger" role="alert">
              {error.data.message}
            </div>
          )}
        </form>
      )}
      <ToastContainer />
    </div>
  );
};

export default SignupPage;
