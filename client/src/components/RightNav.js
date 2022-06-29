import React from "react";
import Notification from "../components/Notification";
const RightNav = () => {
  return (
    <div
      style={{
        height: "50vh",
        overflowY: "auto",
      }}
      className="col-md-3 overflow-auto d-none d-xl-block"
    >
      <Notification />
      <Notification />
      <Notification />
      <Notification />
      <Notification />
      <Notification />
      <Notification />
      <Notification />
      <Notification />
      <Notification />
    </div>
  );
};

export default RightNav;
