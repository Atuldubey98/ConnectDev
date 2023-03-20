import React, { useState } from "react";
import { useDispatch } from "react-redux";
import uuid from "react-uuid";
import { SKILL_ADD } from "../../redux/constants/profileConstants";
function SkillTabBody({ skills, sameUser }) {
  const [showInput, setShowInput] = useState(false);
  const defaultSkill = { yearsWorked: 0, skill: "" };
  const [skill, setSkill] = useState(defaultSkill);
  const dispatch = useDispatch();
  function onChange(e) {
    const { name, value } = e.target;
    if (name === "yearsWorked") {
      setSkill({ ...skill, yearsWorked: parseFloat(value) });
    } else {
      setSkill({ ...skill, skill: value });
    }
  }
  function toggleInput() {
    setShowInput(!showInput);
  }
  function onSubmit(e) {
    e.preventDefault();
    dispatch({ type: SKILL_ADD, payload: { ...skill, _id: uuid() } });
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
            <strong>{`${skillSet.skill} - (${
              skillSet?.yearsWorked || 0
            }) years`}</strong>
          </li>
        ))}
        {showInput ? (
          <li className="list-group-item">
            <form onSubmit={onSubmit} className="w-100 d-flex">
              <input
                value={skill.skill}
                onChange={onChange}
                type="text"
                required
                name="skill"
                className="input-control w-100"
                placeholder="Type The Skill"
              />
              <input
                value={skill.yearsWorked}
                onChange={onChange}
                type="number"
                name="yearsWorked"
                required
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
