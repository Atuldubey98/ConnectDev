import { Link } from "react-router-dom"
import TextTruncate from "react-text-truncate"
import { IUserDetails } from "./interfaces"
import PostTitle from "./PostTitle"
import PostAuthor from "./PostAuthor"
import moment from "moment"
import PostText from "./PostText"

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
        <PostTitle title={title} />

        <PostAuthor user={user} date={date} />
      </div>
      <PostText postId={postId} text={text} />
    </div>
  )
}
