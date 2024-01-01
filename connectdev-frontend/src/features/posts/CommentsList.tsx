import { formatDistanceToNow } from "date-fns"
import { LegacyRef, forwardRef } from "react"
import { useAppSelector } from "../../app/hooks"
import "./CommentsList.css"
import { UserAvatarSmall } from "./CreatePost"
import { IComment } from "./interfaces"
type CommentsListProps = {
  comments: IComment[]
  maxHeight?: string
  onDeleteComment: (postId: string, commentId: string) => void
}

const CommentsList = forwardRef(
  (
    { comments, maxHeight, onDeleteComment }: CommentsListProps,
    ref: LegacyRef<HTMLDivElement>,
  ) => {
    const storedComments = [...comments]
    const { user } = useAppSelector((state) => state.login)
    return (
      <div>
        <div
          style={{
            height: maxHeight || "40svh",
          }}
          className="comments__list"
        >
          <div>
            {storedComments
              .sort(
                (a, b) =>
                  new Date(a.createdAt).getTime() -
                  new Date(b.createdAt).getTime(),
              )
              .map((comment) => (
                <Comment
                  key={comment._id}
                  comment={comment}
                  userId={user?._id || ""}
                  onClickDelete={onDeleteComment}
                />
              ))}
          </div>
          <div ref={ref}></div>
        </div>
      </div>
    )
  },
)
export default CommentsList
function Comment({
  comment,
  userId,
  onClickDelete,
}: {
  comment: IComment
  userId: string
  onClickDelete?: (postId: string, commentId: string) => void
}) {
  const _id = `comment-${comment._id}`
  return (
    <div id={_id} className="comment">
      <UserAvatarSmall
        size={20}
        name={comment.user.name}
        avatar={comment.user.avatar}
      />
      <div className="comment__wrap">
        <p>{comment.user.name}</p>
        <div className="comment__text">
          <span>{comment.text}</span>
        </div>
        <div className="comment__footer">
          {userId === comment.user._id ? (
            <span
              onClick={() => {
                if (onClickDelete) {
                  onClickDelete(comment.post, comment._id)
                }
              }}
              className="comment__del"
            >
              Delete --
            </span>
          ) : null}
          <span>{formatDistanceToNow((new Date(comment.createdAt)), { addSuffix: true })}</span>
        </div>
      </div>
    </div>
  )
}
