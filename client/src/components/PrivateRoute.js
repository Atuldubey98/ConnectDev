import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.user);
  return !loading && !isAuthenticated ? <Navigate to="/login" /> : children;
};

export default PrivateRoute;
