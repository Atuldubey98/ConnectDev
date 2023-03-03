import React, { useState } from "react";
import {
  Link,
  useNavigate,
  createSearchParams,
  useLocation,
} from "react-router-dom";
import useQuery from "../hooks/useQuery";
const Header = () => {
  const [search, setsearch] = useState("");
  const location = useLocation();
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    let params = {};
    if (query.has("limit")) {
      params.limit = query.get("limit");
    }
    if (query.has("page")) {
      params.page = 0;
    }
    if (query.has("nav")) {
      params.nav = true;
    }
    if (search && search !== "") {
      params.s = search;
    }
    navigate({
      pathname: "/",
      search: `?${createSearchParams(params)}`,
    });
  };
  const navigate = useNavigate();
  const query = useQuery();
  const handleSearchChange = (e) => {
    setsearch(e.target.value);
  };
  const navigateToSideNav = () => {
    let params = {};

    if (query.has("limit")) {
      params.limit = query.get("limit");
    }
    if (query.has("page")) {
      params.page = query.get("page");
    }
    if (!query.has("nav")) {
      params.nav = true;
    }
    navigate({
      pathname: location.pathname,
      search: `?${createSearchParams(params)}`,
    });
  };
  const headerNavList = [
    {
      text: "Home",
      link: "/?nav=true",
      className: "mr-3",
      iconClass: "fa-solid fa-house mr-2",
    },
    {
      text: "Chats",
      link: "/chats",
      className: "mr-3",
      iconClass: "fa-brands fa-rocketchat mr-2",
    },
    {
      text: "My Posts",
      link: "/?nav=true&myPosts=true",
      className: "mr-3",
      iconClass: "fa-solid fa-signs-post mr-2",
    },
    {
      text: "Profile",
      link: "/profile?nav=true",
      className: "mr-3",
      iconClass: "fa-solid fa-user mr-2",
    },
  ];
  const navigateToCompose = () => {
    let params = { nav: true };

    navigate({
      pathname: "/compose",
      search: `?${createSearchParams(params)}`,
    });
  };
  return (
    <nav className="navbar navbar-expand-lg bg-light sticky-top">
      <div className="container-fluid">
        <div className="navbar-header d-flex">
          <button className="btn btn-light" onClick={navigateToSideNav}>
            <i className="fa-solid fa-bars" style={{ cursor: "pointer" }}></i>
          </button>
          <Link className="navbar-brand font-weight-bold" to="#">
            Connect Dev
          </Link>
        </div>
        <ul className="nav navbar-nav navbar-left d-none d-xl-flex">
          {headerNavList.map((h) => (
            <li key={h.text} className={h.className}>
              <Link to={h.link}>{h.text}</Link>
            </li>
          ))}
        </ul>
        <ul className="nav navbar-nav navbar-right d-flex justify-items-center align-content-center">
          <li className="mr-2">
            <button
              onClick={navigateToCompose}
              type="button"
              className="btn btn-light"
            >
              <i className="fa-solid fa-pen-to-square"></i>
              <span className="ml-2">Compose </span>
            </button>
          </li>
          <li>
            <form onSubmit={handleSearchSubmit}>
              <div className="d-flex justify-items-center align-content-center">
                <input
                  type="text"
                  placeholder="Search"
                  onChange={handleSearchChange}
                />
                <button className="btn btn-primary" type="submit">
                  Search
                </button>
              </div>
            </form>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
