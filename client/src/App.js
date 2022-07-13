import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route, useNavigate } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import ComposePage from "./pages/ComposePage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import { loadUser } from "./redux/actions/userActions";
const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch, navigate]);
  return (
    <div className="app">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route
          path="/compose"
          element={
            <PrivateRoute>
              <ComposePage />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
