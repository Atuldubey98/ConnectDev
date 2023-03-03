import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import LoadingPage from "../pages/LoadingPage";

const PrivateRoute = ({ children }) => {
  const user = useSelector((state) => state.user);
  const { loading, isAuthenticated } = user;
  if (loading === undefined || loading === true) {
    return <LoadingPage />;
  } else {
    return isAuthenticated ? children : <Navigate to={"/login"} />;
  }
};

export default PrivateRoute;
