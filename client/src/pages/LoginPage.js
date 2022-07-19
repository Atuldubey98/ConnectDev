import React, { useEffect, useState } from "react";
import { login } from "../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, isAuthenticated } = useSelector((state) => state.user);
  const [password, setPassword] = useState("");
  const onFormSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/?nav=true", { replace: true });
    }
  }, [isAuthenticated, navigate]);
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
          <div className=" mb-3 d-flex flex-column align-items-center">
            <button type="submit" className="btn btn-success mb-1">
              Login
            </button>
            <Link to="/signup">Sign Up</Link>
          </div>
        </form>
      )}
    </div>
  );
};

export default LoginPage;
