import { Link } from "react-router-dom"
import TextTruncate from "react-text-truncate"
import { IUserDetails } from "./interfaces"

type PostBodyProps = {
  text: string
  user: IUserDetails | undefined
  title: string
  date: string
  postId: string
}

export default function PostBody({
  postId,
  text,
  user,
  title,
  date,
}: PostBodyProps) {
  return (
    <div className="post__body">
      <div className="post__about">
        <TextTruncate text={title} element={"h3"} truncateText="..." line={2} />

        <p className="post__author">
          <span>
            By <Link to={`/profile/${user?._id}`}>{user?.name}</Link>
          </span>
          <span className="post__date"> {date}</span>
        </p>
      </div>
      <Link to={`/posts/${postId}`}>
        <TextTruncate text={text} element={"p"} truncateText="..." line={5} />
      </Link>
    </div>
  )
}
