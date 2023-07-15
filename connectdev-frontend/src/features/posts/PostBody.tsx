import PostAuthor from "./PostAuthor"
import PostText from "./PostText"
import PostTitle from "./PostTitle"
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
        <PostTitle title={title} />

        <PostAuthor user={user} date={date} />
      </div>
      <PostText postId={postId} text={text} />
    </div>
  )
}
