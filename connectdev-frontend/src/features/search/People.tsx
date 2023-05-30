import { Link } from "react-router-dom"
import { UserAvatarSmall } from "../posts/CreatePost"
import { IUserDetails } from "../posts/interfaces"
import "./People.css"
type PeopleProps = {
  user: IUserDetails
}
export default function People({ user }: PeopleProps) {
  return (
    <li className="people">
      <UserAvatarSmall name={user.name} avatar={user.avatar} size={70} />
      <div className="people__about">
        <h4>
          <Link to={`/profile/${user?._id}`}>{user?.name}</Link>
        </h4>
        <p>{user.email}</p>
      </div>
    </li>
  )
}
