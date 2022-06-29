import React from "react";
const Notification = () => {
  return (
    <div
      className="toast m-2 card p-2"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div className="toast-header">
        <strong className="mr-auto">Bootstrap</strong>
        <small className="text-muted">just now</small>
        <button
          type="button"
          className="ml-2 mb-1 close"
          data-dismiss="toast"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="toast-body">See? Just like this.</div>
    </div>
  );
};
export default Notification;
