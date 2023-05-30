import PostAuthor from "../posts/PostAuthor"
import PostText from "../posts/PostText"
import PostTitle from "../posts/PostTitle"
import { IUserDetails } from "../posts/interfaces"
import "./Post.css"
type PostProps = {
  title: string
  user: IUserDetails
  date: string
  postId: string
  text: string
}
export default function Post({ title, user, date, postId, text }: PostProps) {
  return (
    <li className="searched__post">
      <div className="post__about">
        <PostTitle title={title} />
        <PostAuthor user={user} date={date} />
      </div>
      <PostText numberOfLines={2} postId={postId} text={text} />
    </li>
  )
}
