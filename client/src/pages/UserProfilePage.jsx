import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import ProfileComponent from "../components/randomUser/ProfileComponent";
import SideNav from "../components/SideNav";
import useQuery from "../hooks/useQuery";
import { getRandomProfile } from "../redux/actions/randomUserActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function UserProfilePage() {
  const { userId: _id } = useParams();

  const query = useQuery();
  const dispatch = useDispatch();
  function showError(message) {
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }
  useEffect(() => {
    dispatch(getRandomProfile(_id, showError));
  }, [_id, dispatch]);
  if (!_id) {
    return <Navigate to={"/profile?nav=true"} />;
  }
  return (
    <div className="profile">
      <Header />
      <div className="container vh-100">
        <div className="row">
          {query.has("nav") && <SideNav />}
          <ProfileComponent />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default UserProfilePage;
