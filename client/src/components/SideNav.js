import React from "react";
import { Link, useNavigate } from "react-router-dom";
const SideNav = () => {
  const navigate = useNavigate();
  const sideNavList = [
    {
      text: "Home",
      link: "/",
      className: "mb-3",
      iconClass: "fa-solid fa-house mr-2",
    },
    {
      text: "Chats",
      link: "/",
      className: "mb-3",
      iconClass: "fa-brands fa-rocketchat mr-2",
    },
    {
      text: "My Posts",
      link: "/",
      className: "mb-3",
      iconClass: "fa-solid fa-signs-post mr-2",
    },
    {
      text: "Profile",
      link: "/",
      className: "mb-3",
      iconClass: "fa-solid fa-user mr-2",
    },
  ];
  const handleLogout = () => {
    navigate("/login", { replace: true });
  };
  return (
    <div className="col-md-2 d-flex justify-content-start align-items-center flex-column">
      <ul className="list-unstyled justify-content-start align-items-center">
        {sideNavList.map((s) => (
          <li key={s.text} className={s.className}>
            <i className={s.iconClass}></i>
            <Link to={s.link}>{s.text}</Link>
          </li>
        ))}
        <li>
          <i
            onClick={handleLogout}
            className="fa-solid fa-arrow-right-from-bracket mr-2"
          ></i>
          Logout
        </li>
      </ul>
    </div>
  );
};

export default SideNav;
