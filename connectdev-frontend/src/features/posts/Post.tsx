import { IPost } from "../../interfaces/post"
import "./Post.css"
import PostBody from "./PostBody"
import PostBtns from "./PostBtns"
import PostTags from "./PostTags"
import moment from "moment"
type PostProps = {
  post: IPost
}

export default function Post({ post }: PostProps) {
  return (
    <div id={post._id} className="post__wrapper">
      <PostBody
        text={post.text}
        title={post.title}
        name={post.user.name}
        date={moment(post.date).format("DD-MM-YYYY, h:mm")}
      />
      {post.tags && post.tags.length > 0 ? <PostTags tags={post.tags} /> : null}
      <PostBtns likes={post.likes} comments={post.comments} postId={post._id} />
    </div>
  )
}
