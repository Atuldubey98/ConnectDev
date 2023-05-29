import { useState } from "react"
import { GrAddCircle } from "react-icons/gr"
import { v4 as uuidv4 } from "uuid"
import Input from "../common/Input"
import MessageInfo from "../common/MessageInfo"
import CommonHeading from "../profile/CommonHeading"
import { Skill } from "../profile/ProfileSkills"
import { SkillBody } from "./interfaces"
import useEdit from "./useEdit"
type ProfileSkillsForm = {
  skillErrTxt: string
  skills: SkillBody[]
  updateSkillDispatch: (skill: SkillBody) => void
  removeSkillDispatch: (skillId: string) => void
  addSkillDispatch: (skill: SkillBody) => void
}
export default function ProfileSkillsForm({
  skills,
  updateSkillDispatch,
  skillErrTxt,
  removeSkillDispatch,
  addSkillDispatch,
}: ProfileSkillsForm) {
  const { edit, toggleEdit } = useEdit()
  const defaultSkill: SkillBody = {
    skill: "",
    _id: uuidv4(),
    yearsWorked: 0,
  }
  const [skill, setSkill] = useState<SkillBody>(defaultSkill)
  function onSkillClick(_id: string) {
    setSkill(skills.find((skill) => skill._id === _id) || defaultSkill)
    toggleEdit(true)
  }
  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    if (skills.find((s) => s._id === skill._id)) {
      updateSkillDispatch(skill)
    } else {
      addSkillDispatch(skill)
      setSkill(defaultSkill)
    }
  }
  function newSkill() {
    setSkill(defaultSkill)
    toggleEdit(true)
  }
  return (
    <div className="profile__form">
      <div className="profile__formHead">
        <CommonHeading text="Skills" />
        <GrAddCircle size={30} onClick={newSkill} className="cursor__pointer" />
      </div>
      <ul className="common__profileList">
        {skills.map((skill) => (
          <div key={skill._id} className="border__wrapper">
            <Skill
              onSkillClick={onSkillClick}
              skill={skill.skill}
              _id={skill._id}
              yearsWorked={skill.yearsWorked}
            />
          </div>
        ))}
      </ul>
      {edit ? (
        <form className="profile__mainForm" onSubmit={onSubmit}>
          <Input
            name="skill"
            onChange={(e) =>
              setSkill({ ...skill, skill: e.currentTarget.value })
            }
            value={skill.skill}
            type="text"
            required
            label={"Skill Name :"}
          />
          <Input
            name="yearsWorked"
            onChange={(e) => {
              setSkill({
                ...skill,
                yearsWorked: isNaN(Number(e.currentTarget.value))
                  ? 0
                  : Number(e.currentTarget.value),
              })
            }}
            required
            value={skill.yearsWorked}
            type="number"
            label={"Years Worked :"}
          />
          {skillErrTxt ? (
            <MessageInfo isError={true} message={skillErrTxt} />
          ) : null}
          <div className="profile__btns d-flex-center">
            <button className="primary__btn" type="submit">
              {skills.find((s) => s._id === skill._id)
                ? "Update Skill"
                : "Add Skill"}
            </button>
            {skills.find((s) => s._id === skill._id) ? (
              <button
                onClick={() => {
                  removeSkillDispatch(skill._id)
                  toggleEdit(false)
                }}
                type="button"
                className="btn"
              >
                Delete
              </button>
            ) : null}
          </div>
        </form>
      ) : null}
    </div>
  )
}
