import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useQuery from "../hooks/useQuery";
const Header = () => {
  const [search, setsearch] = useState("");
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log(search);
  };
  const navigate = useNavigate();
  const location = useLocation();
  const query = useQuery();
  const handleSearchChange = (e) => {
    setsearch(e.target.value);
  };
  const navigateToSideNav = () => {
    navigate(
      query.has("nav") ? location.pathname : location.pathname + "?nav=true"
    );
  };
  const headerNavList = [
    {
      text: "Home",
      link: "/",
      className: "mr-3",
      iconClass: "fa-solid fa-house mr-2",
    },
    {
      text: "Chats",
      link: "/",
      className: "mr-3",
      iconClass: "fa-brands fa-rocketchat mr-2",
    },
    {
      text: "Posts",
      link: "/",
      className: "mr-3",
      iconClass: "fa-solid fa-signs-post mr-2",
    },
    {
      text: "Profile",
      link: "/",
      className: "mr-3",
      iconClass: "fa-solid fa-user mr-2",
    },
  ];
  return (
    <nav className="navbar navbar-expand-lg bg-light sticky-top">
      <div className="container-fluid">
        <div className="navbar-header">
          <i
            className="fa-solid fa-bars pr-2"
            style={{ cursor: "pointer" }}
            onClick={navigateToSideNav}
          ></i>
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
            <span className="font-weight-bold">Compose</span>
            <i className="fa-solid fa-pen-to-square"></i>
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
