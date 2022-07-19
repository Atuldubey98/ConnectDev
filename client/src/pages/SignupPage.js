import { Link } from "react-router-dom";
import React, { useState } from "react";
import { register } from "../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);

  const [password, setPassword] = useState("");
  const onFormSubmit = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password));
  };
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
              value={name}
              placeholder={"First Name + Last Name"}
              aria-describedby="name"
            />
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
              placeholder={"user@example.com"}
              aria-describedby="emailHelp"
            />
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
    </div>
  );
};

export default SignupPage;
