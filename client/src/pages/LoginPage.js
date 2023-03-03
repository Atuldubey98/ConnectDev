import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../redux/actions/userActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useValidate from "../hooks/useValidate";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { validate, validationError } = useValidate("login", {
    email,
    password,
  });
  const [errorMsg, setErrorMsg] = useState({ email: null, password: null });
  const onFormSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setErrorMsg(validationError);
    } else {
      dispatch(login(email, password, navigate, setToast));
    }
  };
  function setToast(message) {
    toast.error(message, {
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
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div
      style={{
        height: "100vh",
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
              Email address
            </label>
            <input
              type="email"
              onChange={handleEmailChange}
              className="form-control"
              id="exampleInputEmail1"
              value={email}
              placeholder={"user@example.com"}
              aria-describedby="emailHelp"
            />
            {errorMsg.email ? (
              <small className="form-text text-danger">{errorMsg.email}</small>
            ) : null}
          </div>
          <div className="mb-3">
            <label
              htmlFor="exampleInputPassword1"
              className="form-label font-weight-bold"
            >
              Password
            </label>
            <input
              type="password"
              placeholder={"Password"}
              value={password}
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
          <div className=" mb-3 d-flex flex-column align-items-center">
            <button type="submit" className="btn btn-success mb-1">
              Login
            </button>
            <Link to="/signup">Sign Up</Link>
          </div>
        </form>
      )}
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
