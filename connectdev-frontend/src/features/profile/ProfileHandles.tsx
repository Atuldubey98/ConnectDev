import CommonField from "./CommonField"
import CommonHeading from "./CommonHeading"
import { HandleEntity } from "./interfaces"
type ProfileHandlesProps = {
  handles: HandleEntity[]
}
export default function ProfileHandles(props: ProfileHandlesProps) {
  return (
    <div>
      <CommonHeading text="Social Media Handles" />
      <ul className="common__profileList">
        {props.handles.map((handle) => (
          <li key={handle._id}>
            <CommonField head="Username or Email Id" text={handle.username} />
            <CommonField head="Platform" text={handle.platform} />
            <CommonField head="Profile Link" text={handle.link} />
          </li>
        ))}
      </ul>
    </div>
  )
}
