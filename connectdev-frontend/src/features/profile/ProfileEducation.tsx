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
        {props.educations.map((edu) => (
          <li key={edu._id}>
            <CommonField head="Degree" text={edu.degree} />
            <CommonField head="Area or Field of Study" text={edu.area} />
            <CommonField head="School or Institute" text={edu.school} />
            <CommonField head="Description" text={edu.description} />
          </li>
        ))}
      </ul>
    </div>
  )
}
