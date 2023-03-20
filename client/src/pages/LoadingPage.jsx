import React from "react";

function LoadingPage() {
  return (
    <div
      style={{ minHeight: "100svh" }}
      className="d-flex justify-content-center align-items-center"
    >
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
    </div>
  );
}

export default LoadingPage;
