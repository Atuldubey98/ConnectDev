import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Header from "../components/Header";
import Posts from "../components/Posts";
import SideNav from "../components/SideNav";
import useQuery from "../hooks/useQuery";
import { getAllPosts } from "../redux/actions/postActions";
// import { io } from "socket.io-client";

const HomePage = () => {
  const query = useQuery();
  const dispatch = useDispatch();
  const limit = query.has("limit") ? query.get("limit") : 10;
  const page = query.has("page") ? query.get("page") : 0;
  const s = query.has("s") ? query.get("s") : "";
  const myPosts = query.has("myPosts") ? true : false;
  useEffect(() => {
    dispatch(getAllPosts(limit, page, s, myPosts));
  }, [dispatch, limit, page, s, myPosts]);
  // const socket = io("http://localhost:9000", {
  //   withCredentials: true,
  // });
  return (
    <div className="home">
      <Header />
      <div className="container-fluid vh-100">
        <div className="row">
          {query.has("nav") && <SideNav />}
          <Posts />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
