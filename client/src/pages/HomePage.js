import React from "react";
import Header from "../components/Header";
import Posts from "../components/Posts";
import RightNav from "../components/RightNav";
import SideNav from "../components/SideNav";
import useQuery from "../hooks/useQuery";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllPosts } from "../redux/actions/postActions";

const HomePage = () => {
  const query = useQuery();
  const dispatch = useDispatch();
  const limit = query.has("limit") ? query.get("limit") : 10;
  const page = query.has("page") ? query.get("page") : 0;
  useEffect(() => {
    dispatch(getAllPosts(limit, page));
  }, [dispatch, limit, page]);

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
