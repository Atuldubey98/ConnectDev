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
        {props.handles.map(({ _id, link, username, platform }) => (
          <Handle
            key={_id}
            username={username}
            link={link}
            platform={platform}
          />
        ))}
      </ul>
    </div>
  )
}
export function Handle({
  username,
  platform,
  link,
}: {
  username: string
  platform: string
  link: string
}): JSX.Element {
  return (
    <li>
      <CommonField head="Username or Email Id" text={username} />
      <CommonField head="Platform" text={platform} />
      <CommonField head="Profile Link" text={link} />
    </li>
  )
}
