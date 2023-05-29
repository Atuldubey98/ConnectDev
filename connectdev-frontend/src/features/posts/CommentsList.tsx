import moment from "moment"
import { IComment } from "./interfaces"
import "./CommentsList.css"
import { UserAvatarSmall } from "./CreatePost"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { deleteCommentAction } from "./postSlice"
import { LegacyRef, forwardRef } from "react"
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
      <div
        style={{
          height: maxHeight || "40svh",
        }}
        className="comments__list"
      >
        {storedComments
          .sort(
            (a, b) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
          )
          .map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              userId={user?._id || ""}
              onClickDelete={onDeleteComment}
            />
          ))}
        <div ref={ref}></div>
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
  return (
    <div className="comment">
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
          <span>{moment(comment.createdAt).fromNow()}</span>
        </div>
      </div>
    </div>
  )
}
