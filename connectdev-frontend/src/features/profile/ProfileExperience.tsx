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
        {props.experience.map(({ _id, title, company, description }) => (
          <Experience
            key={_id}
            title={title}
            company={company}
            description={description}
          />
        ))}
      </ul>
    </div>
  )
}
export type ExperienceProps = {
  title: string
  company: string
  description: string
  onClick?: () => void
}
export function Experience({
  title,
  onClick,
  company,
  description,
}: ExperienceProps): JSX.Element {
  return (
    <li onClick={onClick}>
      <CommonField head="Title" text={title} />
      <CommonField head="Company" text={company} />
      <CommonField head="Description" text={description} />
    </li>
  )
}
