import { formatDistanceToNow } from "date-fns"
import { IPost } from "../posts/interfaces"
import Post from "./Post"
export type PostListUl = {
  posts: IPost[]
}
export default function PostListUl(props: PostListUl) {
  const { posts } = props
  return (
    <ul className="post__list">
      {posts.map(({ title, user, _id: postId, text, createdAt }) => (
        <Post
          key={postId}
          title={title}
          user={user}
          date={formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
          text={text}
          postId={postId}
        />
      ))}
    </ul>
  )
}
