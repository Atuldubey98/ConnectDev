import React, { useState } from "react";
import { useDispatch } from "react-redux";
import uuid from "react-uuid";
import { SKILL_ADD } from "../../redux/constants/profileConstants";
function SkillTabBody({ skills, sameUser }) {
  const [showInput, setShowInput] = useState(false);
  const [skill, setSkill] = useState("");
  const dispatch = useDispatch();
  function onChange(e) {
    setSkill(e.target.value);
  }
  function toggleInput() {
    setShowInput(!showInput);
  }
  function onSubmit(e) {
    e.preventDefault();
    dispatch({ type: SKILL_ADD, payload: { skill, _id: uuid() } });
    setSkill("");
    toggleInput();
  }
  return (
    <div className="card-body">
      <div className="container d-flex justify-content-between align-items-center mb-3">
        <h5 className="card-title font-weight-bold">Skills</h5>
        {showInput
          ? null
          : sameUser && (
              <button onClick={toggleInput} className="btn btn-dark">
                Add Skill
              </button>
            )}
      </div>
      <ul className="list-group">
        {skills.map((skillSet) => (
          <li key={skillSet._id} className="list-group-item">
            {skillSet.skill}
          </li>
        ))}
        {showInput ? (
          <li className="list-group-item">
            <form onSubmit={onSubmit} className="w-100 d-flex">
              <input
                value={skill}
                onChange={onChange}
                type="text"
                className="input-control w-100"
                placeholder="Type The Skill"
              />
              <button className="btn btn-primary">Add</button>
            </form>
          </li>
        ) : null}
      </ul>
    </div>
  );
}

export default SkillTabBody;
