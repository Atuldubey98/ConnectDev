import { Link } from "react-router-dom"
import { IUserDetails } from "./interfaces"
import "./PostAuthor.css"
export default function PostAuthor({
  user,
  date,
}: {
  user: IUserDetails | undefined
  date: string
}) {
  return (
    <p className="post__author">
      <span>
        By <Link to={`/profile/${user?._id}`}>{user?.name}</Link>
      </span>
      <span className="post__date"> {date}</span>
    </p>
  )
}
