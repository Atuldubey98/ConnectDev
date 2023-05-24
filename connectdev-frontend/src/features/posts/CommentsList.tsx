import moment from "moment"
import { IComment } from "../../interfaces/post"
import "./CommentsList.css"
import { UserAvatarSmall } from "./CreatePost"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { deleteCommentAction } from "./postSlice"
type CommentsListProps = {
  comments: IComment[]
}

export default function CommentsList({ comments }: CommentsListProps) {
  const storedComments = [...comments]
  const { user } = useAppSelector((state) => state.login)
  return (
    <div className="comments__list">
      {storedComments
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .map((comment) => (
          <Comment key={comment._id} comment={comment} userId={user?._id} />
        ))}
    </div>
  )
}

function Comment({ comment, userId }: { comment: IComment; userId?: string }) {
  const appDispatch = useAppDispatch()
  function onClick() {
    appDispatch(
      deleteCommentAction({ postId: comment.post, commentId: comment._id }),
    )
  }
  return (
    <div className="comment">
      <UserAvatarSmall
        size={20}
        name={comment.user.name}
        avatar={comment.user.avatar}
      />
      <div className="comment__wrap">
        <div className="comment__text">
          <span>{comment.text}</span>
        </div>
        <div className="comment__footer">
          {userId === comment.user._id ? (
            <span onClick={onClick} className="comment__del">
              Delete --
            </span>
          ) : null}
          <span>{moment(comment.date).fromNow()}</span>
        </div>
      </div>
    </div>
  )
}
