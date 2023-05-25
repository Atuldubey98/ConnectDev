import { useCallback, useState } from "react"
import { IPost } from "./interfaces"
import "./Post.css"
import PostBody from "./PostBody"
import PostBtns from "./PostBtns"
import PostTags from "./PostTags"
import moment from "moment"
import classNames from "classnames"
import { useAppSelector } from "../../app/hooks"
type PostProps = {
  post: IPost
}

export default function Post({ post }: PostProps) {
  const [beingDeleted, setBeingDelete] = useState<boolean>(false)
  const { justAddedPost } = useAppSelector((state) => state.ui)
  const { justAdded, postId } = justAddedPost
  function onSetBeingDeleted() {
    setBeingDelete(!beingDeleted)
  }
  const justAddedPostId = justAdded && post._id === postId
  const callbackOnDelete = useCallback(onSetBeingDeleted, [])

  return (
    <div
      id={post._id}
      className={classNames("post__wrapper", { beingDeleted, justAddedPostId })}
    >
      <PostBody
        text={post.text}
        title={post.title}
        name={post.user.name}
        date={moment(post.date).fromNow()}
      />
      {post.tags && post.tags.length > 0 ? <PostTags tags={post.tags} /> : null}
      <PostBtns post={post} onDelete={callbackOnDelete} />
    </div>
  )
}
