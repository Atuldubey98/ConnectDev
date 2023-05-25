import { useState } from "react"
import { GrAddCircle } from "react-icons/gr"
import CommonHeading from "../profile/CommonHeading"
import { SkillBody } from "./interfaces"
import { Skill } from "../profile/ProfileSkills"
import Input from "../common/Input"
import { v4 as uuidv4 } from "uuid"
import useEdit from "./useEdit"
import MessageInfo from "../common/MessageInfo"
import Button from "../common/Button"
type ProfileSkillsForm = {
  skillErrTxt: string
  skills: SkillBody[]
  addSkillDispatch: (skill: SkillBody) => void
}
export default function ProfileSkillsForm({
  skills,
  skillErrTxt,
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
    } else {
      addSkillDispatch(skill)
    }
    setSkill(defaultSkill)
    toggleEdit(false)
  }
  function newSkill() {
    setSkill(defaultSkill)
    toggleEdit(true)
  }
  return (
    <div className="profile__form">
      <div className="profile__formHead">
        <CommonHeading text="Skills" />
        <GrAddCircle size={30} onClick={newSkill} />
      </div>
      <ul className="common__profileList">
        {skills.map((skill) => (
          <div key={skill._id} className="skill__wrapper">
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
            label={"Skill"}
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
            value={skill.yearsWorked}
            type="number"
            label={"Years Worked"}
          />
          {skillErrTxt ? (
            <MessageInfo isError={true} message={skillErrTxt} />
          ) : null}
          <div className="d-flex-center">
            <Button
              label={
                skills.find((s) => s._id === skill._id)
                  ? "Update Skill"
                  : "Add Skill"
              }
            />
          </div>
        </form>
      ) : null}
    </div>
  )
}
