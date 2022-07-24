import React from "react";
import Header from "../components/Header";
import SideNav from "../components/SideNav";
import RightNav from "../components/RightNav";
import ProfileUpdates from "../components/ProfileUpdates";

import useQuery from "../hooks/useQuery";

const ProfilePage = () => {
  const query = useQuery();

  return (
    <div className="profile">
      <Header />
      <div className="container-fluid vh-100">
        <div className="row">
          {query.has("nav") && <SideNav />}
          <ProfileUpdates/>
          <RightNav />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
