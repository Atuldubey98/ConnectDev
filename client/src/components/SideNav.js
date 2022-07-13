import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../redux/actions/userActions";
const SideNav = () => {
  const dispatch = useDispatch();
  const sideNavList = [
    {
      text: "Home",
      link: "/",
      className: "m-3",
      iconClass: "fa-solid fa-house mr-2",
    },
    {
      text: "Chats",
      link: "/",
      className: "m-3",
      iconClass: "fa-brands fa-rocketchat mr-2",
    },
    {
      text: "My Posts",
      link: "/",
      className: "m-3",
      iconClass: "fa-solid fa-signs-post mr-2",
    },
    {
      text: "Profile",
      link: "/",
      className: "m-3",
      iconClass: "fa-solid fa-user mr-2",
    },
  ];
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div className="col-md-2 d-flex justify-content-start align-items-center flex-column">
      <ul className="list-unstyled justify-content-start align-items-center">
        {sideNavList.map((s) => (
          <li key={s.text} className={s.className}>
            <i className={s.iconClass}></i>
            <Link className="text-decoration-none text-dark" to={s.link}>
              {s.text}
            </Link>
          </li>
        ))}
        <li onClick={handleLogout} className="cursor-pointer m-3">
          <i className="fa-solid fa-arrow-right-from-bracket mr-2"></i>
          Logout
        </li>
      </ul>
    </div>
  );
};

export default SideNav;
