import CommonField from "./CommonField"
import CommonHeading from "./CommonHeading"
import { ExperienceEntity } from "./interfaces"

type ProfileExperienceProps = {
  experience: ExperienceEntity[]
}
export default function ProfileExperience(props: ProfileExperienceProps) {
  return (
    <div>
      <CommonHeading text="Experience" />
      <ul className="common__profileList">
        {props.experience.map((exp) => (
          <li key={exp._id}>
            <CommonField head="Title" text={exp.title} />
            <CommonField head="Company" text={exp.company} />
            <CommonField head="Description" text={exp.description} />
          </li>
        ))}
      </ul>
    </div>
  )
}
