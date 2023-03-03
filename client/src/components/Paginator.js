import React from "react";
import { useSelector } from "react-redux";
import { createSearchParams, useNavigate } from "react-router-dom";
import useQuery from "../hooks/useQuery";

const Paginator = () => {
  const { loading, metadata } = useSelector((state) => state.posts);
  const query = useQuery();
  const navigate = useNavigate();
  const navigateToPage = (page) => {
    let params = { page };
    if (query.has("limit")) {
      params.limit = query.get("limit");
    }
    if (query.has("nav")) {
      params.nav = true;
    }

    navigate({
      pathname: "/",
      search: `?${createSearchParams(params)}`,
    });
  };

  if (!loading) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <nav aria-label="Page navigation">
          <ul className="pagination">
            {Array.from(Array(metadata?.totalPages).keys()).map((page) => (
              <li
                key={page}
                className={
                  query.get("page") === String(page)
                    ? "page-item active"
                    : "page-item"
                }
              >
                <button
                  className="page-link"
                  onClick={() => navigateToPage(page)}
                >
                  {page + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    );
  }
  return <div></div>;
};

export default Paginator;
