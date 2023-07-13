import classNames from "classnames"
import moment from "moment"
import { LegacyRef, forwardRef, memo, useCallback, useState } from "react"
import "./Post.css"
import PostBody from "./PostBody"
import PostBtns from "./PostBtns"
import PostTags from "./PostTags"
import { IPost } from "./interfaces"
type PostProps = {
  post: IPost
  justAddedPostId: boolean
}

const Post = forwardRef(
  ({ post, justAddedPostId }: PostProps, ref: LegacyRef<HTMLDivElement>) => {
    const [beingDeleted, setBeingDelete] = useState<boolean>(false)

    function onSetBeingDeleted() {
      setBeingDelete(!beingDeleted)
    }
    const callbackOnDelete = useCallback(onSetBeingDeleted, [])

    return (
      <div
        ref={ref}
        id={post._id}
        className={classNames("post__wrapper", {
          beingDeleted,
          justAddedPostId,
        })}
      >
        <PostBody
          postId={post._id}
          text={post.text}
          title={post.title}
          user={post.user}
          date={moment(post.createdAt).fromNow()}
        />
        {post.tags && post.tags.length > 0 ? (
          <PostTags tags={post.tags} />
        ) : null}
        <PostBtns post={post} onDelete={callbackOnDelete} />
      </div>
    )
  },
)
export default memo(Post)
