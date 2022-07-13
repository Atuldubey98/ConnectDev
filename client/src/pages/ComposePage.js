import React from "react";
import Compose from "../components/Compose";
import Header from "../components/Header";
import RightNav from "../components/RightNav";
import SideNav from "../components/SideNav";
import useQuery from "../hooks/useQuery";

const ComposePage = () => {
  const query = useQuery();

  return (
    <div className="compose">
      <Header />
      <div className="container-fluid vh-100">
        <div className="row">
          {query.has("nav") && <SideNav />}
          <Compose />
          <RightNav />
        </div>
      </div>
    </div>
  );
};

export default ComposePage;