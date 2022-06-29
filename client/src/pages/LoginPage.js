import React, { useState } from "react";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onFormSubmit = (e) => {
    e.preventDefault();
  };
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
      <form onSubmit={onFormSubmit} className="d-flex-column col-md-5 justify-content-center align-items-center border border-secondary p-5 bg-light rounded">
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
        <button type="submit" className="btn btn-success">
          Submit
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
