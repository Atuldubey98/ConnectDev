import "./LandingPage.css";
import axios from "axios";
import { useEffect, useState } from "react";
const LandingPage = () => {
  const [profile, setProfile] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      axios
        .get("profile")
        .then((res) => {
          setProfile(res.data);
        })
        .catch((e) => {
          setError(e);
        });
      setLoading(false);
    })();
  }, []);
  return (
    <div className="land-page">
      <div className="container">
        <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
          <a
            href="/"
            className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none"
          >
            <svg
              className="bi me-2"
              width="40"
              height="32"
              role="img"
              aria-label="Bootstrap"
            ></svg>
          </a>

          <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
            <li>
              <a href="/" className="nav-link px-2 link-secondary">
                Home
              </a>
            </li>
            <li>
              <a href="/" className="nav-link px-2 link-dark">
                Features
              </a>
            </li>
            <li>
              <a href="/" className="nav-link px-2 link-dark">
                Pricing
              </a>
            </li>
            <li>
              <a href="/" className="nav-link px-2 link-dark">
                FAQs
              </a>
            </li>
            <li>
              <a href="/" className="nav-link px-2 link-dark">
                About
              </a>
            </li>
          </ul>
          <div className="col-ml-3 text-end">
            <button type="button" className="btn btn-outline-primary me-2">
              Logout
            </button>
          </div>
        </header>
      </div>
      <div className="container">{profile?.handle}</div>
      <div className="error">{error?.status}</div>
    </div>
  );
};

export default LandingPage;
