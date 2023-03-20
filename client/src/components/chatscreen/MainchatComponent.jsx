import React, { useState } from "react";
import ActiveComponent from "./ActiveComponent";
import MainchatHeader from "./MainchatHeader";
import SearchComponent from "./SearchComponent";

function MainchatComponent() {
  const [menuNumber, setMenuNumber] = useState(0);
  function onSetMenuNumber(index) {
    setMenuNumber(index);
  }
  const chatContainers = [<ActiveComponent />, <SearchComponent />];
  return (
    <div style={{ minHeight: "100vh" }} className="col">
      <MainchatHeader
        onSetMenuNumber={onSetMenuNumber}
        menuNumber={menuNumber}
      />
      {chatContainers[menuNumber]}
    </div>
  );
}

export default MainchatComponent;
