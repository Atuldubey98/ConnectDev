import "./LoginPage.css";
import axios from "axios";
import { useState } from "react";
import { Navigate } from "react-router-dom";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [navigate, setNavigate] = useState(false);
  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "users/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      axios.defaults.headers.common["Authorization"] = data?.accessToken;
      localStorage.setItem("accessToken", data?.accessToken);
      setNavigate(true);
    } catch (e) {
      console.log(e);
    }
  };
  if (navigate) {
    return <Navigate to="/" />;
  }
  return (
    <div className="login-page text-center">
      <form onSubmit={onFormSubmit} autoComplete="off" className="form-signin">
        <img
          className="mb-4"
          src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg"
          alt=""
          width="72"
          height="72"
        />
        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
        <label htmlFor="inputEmail" className="sr-only">
          Email address
        </label>
        <input
          type="email"
          id="inputEmail"
          className="form-control mb-2"
          placeholder="Email address"
          required
          autoFocus
          value={email}
          onChange={onEmailChange}
        />
        <label htmlFor="inputPassword" className="sr-only">
          Password
        </label>
        <input
          type="password"
          id="inputPassword"
          className="form-control mb-2"
          placeholder="Password"
          required
          value={password}
          onChange={onPasswordChange}
        />
        <div className="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me" />
            Remember me
          </label>
        </div>
        <button className="btn btn-lg btn-primary btn-block" type="submit">
          Sign in
        </button>
        <p className="mt-5 mb-3 text-muted">© 2017-2018</p>
      </form>
    </div>
  );
};
export default LoginPage;
