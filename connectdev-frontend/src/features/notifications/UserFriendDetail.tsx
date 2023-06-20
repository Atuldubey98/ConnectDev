import { Link } from "react-router-dom"
import { UserAvatarSmall } from "../posts/CreatePost"
import { IUserDetails } from "../posts/interfaces"

export type UserFriendDetailProps = {
  user: IUserDetails
}
export default function UserFriendDetail(props: UserFriendDetailProps) {
  const { user: requestor } = props
  return (
    <div className="d-flex-center">
      <UserAvatarSmall
        name={requestor.name}
        avatar={requestor.avatar}
        size={40}
      />
      <div className="friend__requestAbout">
        <Link to={`/profile/${requestor._id}`}>
          <p>{requestor.name}</p>
        </Link>
        <p>{requestor.email}</p>
        
      </div>
    </div>
  )
}
