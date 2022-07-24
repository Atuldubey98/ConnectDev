import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../redux/actions/userActions";
import { useSelector } from "react-redux";

const SideNav = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  console.log("http://localhost:9000" + user.avatar);
  const sideNavList = [
    {
      text: "Home",
      link: "/?nav=true",
      iconClass: "fa-solid fa-house mr-2",
    },
    {
      text: "Chats",
      link: "/",
      iconClass: "fa-brands fa-rocketchat mr-2",
    },
    {
      text: "My Posts",
      link: "/?nav=true&myPosts=true",
      iconClass: "fa-solid fa-signs-post mr-2",
    },
  ];
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div className="col-md-2 d-flex flex-column">
      <div className="list-unstyled list-group list-group-flush">
        {sideNavList.map((s) => (
          <li
            key={s.text}
            className={
              "list-group-item font-weight-bold list-group-item-action"
            }
          >
            <i className={s.iconClass}></i>
            <Link className="text-decoration-none text-dark" to={s.link}>
              {s.text}
            </Link>
          </li>
        ))}
        <li
          style={{
            cursor: "pointer",
          }}
          className="list-group-item font-weight-bold list-group-item-action"
        >
          {user && user.avatar ? (
            <img
              src={"http://localhost:9000" + user.avatar}
              className="rounded-circle mr-2"
              style={{ width: "20px" }}
              alt="Avatar"
            />
          ) : (
            <i className="fa-solid fa-user mr-2"></i>
          )}
          <span>Profile</span>
        </li>
        <li
          style={{
            cursor: "pointer",
          }}
          onClick={handleLogout}
          className="list-group-item font-weight-bold list-group-item-action"
        >
          <i className="fa-solid fa-arrow-right-from-bracket mr-2"></i>
          Logout
        </li>
      </div>
    </div>
  );
};

export default SideNav;
