import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/actions/userActions";
import { useSelector } from "react-redux";
import { socket } from "../context/SocketContext";

const SideNav = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  function navigateTo(url) {
    if (url) {
      navigate(url);
    }
  }
  const sideNavList = [
    {
      text: "Home",
      link: "/?nav=true",
      iconClass: "fa-solid fa-house mr-2",
    },
    {
      text: "Chats",
      link: "/chats?nav=true",
      iconClass: "fa-brands fa-rocketchat mr-2",
    },
    {
      text: "My Posts",
      link: "/?nav=true&myPosts=true",
      iconClass: "fa-solid fa-signs-post mr-2",
    },
  ];
  const handleLogout = () => {
    dispatch(logout(socket));
  };
  return (
    <div className="col-md-2 d-flex flex-column align-items-center w-100">
      <div className="list-unstyled list-group list-group-flush w-100">
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
          onClick={() => navigateTo(`/profile?nav=${true}`)}
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
