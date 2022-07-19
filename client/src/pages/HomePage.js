import React from "react";
import Header from "../components/Header";
import Posts from "../components/Posts";
import RightNav from "../components/RightNav";
import SideNav from "../components/SideNav";
import useQuery from "../hooks/useQuery";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../redux/actions/postActions";
import { Navigate } from "react-router-dom";

const HomePage = () => {
  const query = useQuery();
  const dispatch = useDispatch();
  const limit = query.has("limit") ? query.get("limit") : 10;
  const page = query.has("page") ? query.get("page") : 0;
  const s = query.has("s") ? query.get("s") : "";
  const myPosts = query.has("myPosts") ? true : false;
  const { loading, user } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getAllPosts(limit, page, s, myPosts));
  }, [dispatch, limit, page, s, myPosts]);
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
