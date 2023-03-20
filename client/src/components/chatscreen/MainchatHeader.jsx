import React from "react";
import classnames from "classnames";
function MainchatHeader({ onSetMenuNumber, menuNumber }) {
  return (
    <ul className="nav nav-tabs font-weight-bold">
      <li
        onClick={() => onSetMenuNumber(0)}
        style={{ cursor: "pointer" }}
        className="nav-item"
      >
        <p
          className={classnames("nav-link", { active: menuNumber === 0 })}
          aria-current="page"
        >
          <span className="mr-3 ">Active</span>
          <i className="fa-solid fa-comment text-success" />
        </p>
      </li>

      
      <li
        onClick={() => onSetMenuNumber(1)}
        style={{ cursor: "pointer" }}
        className="nav-item"
      >
        <p className={classnames("nav-link", { active: menuNumber === 1 })}>
          <span className="mr-3">Search</span>
          <i className="fa-solid fa-magnifying-glass text-secondary" />
        </p>
      </li>
    </ul>
  );
}

export default MainchatHeader;
