import CommonField from "./CommonField"
import CommonHeading from "./CommonHeading"
import "./ProfileSkills.css"
import { SkillsEntity } from "./interfaces"
type ProfileSkillsProps = {
  skills: SkillsEntity[]
}
export default function ProfileSkills({ skills }: ProfileSkillsProps) {
  return (
    <div>
      <CommonHeading text="Skills" />
      <ul className="common__profileList">
        {skills.map((skill) => (
          <Skill
            key={skill._id}
            _id={skill._id}
            skill={skill.skill}
            yearsWorked={skill.yearsWorked}
          />
        ))}
      </ul>
    </div>
  )
}
export function Skill({
  skill,
  _id,
  onSkillClick,
  yearsWorked,
}: {
  _id: string
  skill: string
  yearsWorked: number
  onSkillClick?: (_id: string) => void
}): JSX.Element {
  return (
    <li
      onClick={() => {
        if (onSkillClick) {
          onSkillClick(_id)
        }
      }}
    >
      <CommonField head="Skill" text={skill} />
      <CommonField head="Years of Experience" text={yearsWorked} />
    </li>
  )
}
