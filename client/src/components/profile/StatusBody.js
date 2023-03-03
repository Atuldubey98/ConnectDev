import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { STATUS_CHANGE } from "../../redux/constants/profileConstants";

function StatusBody({ status, sameUser }) {
  const [showInput, setShowInput] = useState(false);
  const statusRef = useRef();
  function toggleInput() {
    setShowInput(!showInput);
  }
  const dispatch = useDispatch();
  function onSubmit(e) {
    e.preventDefault();
    dispatch({ type: STATUS_CHANGE, payload: statusRef.current?.value });
    toggleInput();
  }
  return (
    <div className="mt-3">
      <div className="container d-flex justify-content-between align-items-center mb-3">
        <h5 className="card-title">Status</h5>
        {showInput
          ? null
          : sameUser && (
              <button onClick={toggleInput} className="btn btn-dark">
                Update Status
              </button>
            )}
      </div>
      {showInput ? null : <p className="text-bold">{status}</p>}
      {showInput ? (
        <form className="mb-3" onSubmit={onSubmit}>
          <textarea
            name="status"
            id="status"
            className="form-control w-100"
            placeholder="Write your status here"
            ref={statusRef}
            defaultValue={status}
          />
          <button type="submit" className="mt-3 btn btn-primary">
            Update Status
          </button>
        </form>
      ) : null}
    </div>
  );
}

export default StatusBody;
