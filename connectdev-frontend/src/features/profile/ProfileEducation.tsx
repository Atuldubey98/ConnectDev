import React from "react"
import CommonHeading from "./CommonHeading"
import CommonField from "./CommonField"
import { EducationEntity } from "./interfaces"
type ProfileEducationProps = {
  educations: EducationEntity[]
}
export default function ProfileEducation(props: ProfileEducationProps) {
  return (
    <div>
      <CommonHeading text="Education" />
      <ul className="common__profileList">
        {props.educations.map(({ degree, description, school, area, _id }) => (
          <Education
            key={_id}
            degree={degree}
            area={area}
            school={school}
            description={description}
          />
        ))}
      </ul>
    </div>
  )
}
export type EducationProps = {
  degree: string
  area: string
  school: string
  onClick?: VoidFunction
  description: string
}
export function Education({
  degree,
  description,
  onClick,
  school,
  area,
}: EducationProps): JSX.Element {
  return (
    <li onClick={onClick}>
      <CommonField head="Degree" text={degree} />
      <CommonField head="Area or Field of Study" text={area} />
      <CommonField head="School or Institute" text={school} />
      <CommonField head="Description" text={description} />
    </li>
  )
}
