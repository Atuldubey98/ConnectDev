import React from "react";
import Header from "../components/Header";
import Posts from "../components/Posts";
import RightNav from "../components/RightNav";
import SideNav from "../components/SideNav";
import useQuery from "../hooks/useQuery";
const HomePage = () => {
  const query = useQuery();
  return (
    <div className="home">
      <Header />
      <div className="container-fluid vh-100">
        <div className="row">
          {query.has("nav") && <SideNav />}
          <Posts />
          <RightNav />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
