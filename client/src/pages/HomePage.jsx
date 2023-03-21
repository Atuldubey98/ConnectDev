import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Header";
import Posts from "../components/Posts";
import SideNav from "../components/SideNav";
import { socket } from "../context/SocketContext";
import useFilters from "../hooks/useFilters";
import useQuery from "../hooks/useQuery";
import { getAllPosts } from "../redux/actions/postActions";
const HomePage = () => {
  const dispatch = useDispatch();
  const query = useQuery();
  const filters = useFilters();
  const { limit, page, s, myPosts } = filters;
  useEffect(() => {
    socket.connect();
    dispatch(getAllPosts(limit, page, s, myPosts));
  }, [dispatch, limit, page, s, myPosts]);

  return (
    <div className="home">
      <Header />
      <div className="container vh-100">
        <div className="row">
          {query.has("nav") && <SideNav />}
          <Posts />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default HomePage;
