import React from "react";
import Notification from "./Notification";
const RightNav = () => {
  return (
    <div
      style={{
        height: "50vh",
        overflowY: "auto",
      }}
      className="col-md-3 overflow-auto"
    >
      <Notification />
    </div>
  );
};

export default RightNav;
