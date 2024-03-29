import { useRef } from "react"
import { AiOutlineClose } from "react-icons/ai"
import { useAppDispatch } from "../../app/hooks"
import socket from "../../socket"
import { toggleCommentsModal } from "../ui/uiSlice"
import CommentsForm from "./CommentsForm"
import CommentsList from "./CommentsList"
import { IComment, IUserDetails } from "./interfaces"
import { deleteCommentAction, postCommentAction } from "./postSlice"

type CommentSectionProps = {
  user: IUserDetails | undefined
  comments: IComment[]
  postId: string
  showClose?: boolean
}
export default function CommentSection({
  user,
  comments,
  postId,
  showClose,
}: CommentSectionProps) {
  const lastCommentRef = useRef<HTMLDivElement>(null)
  const appDispatch = useAppDispatch()
  function onDeleteComment(postId: string, commentId: string) {
    appDispatch(deleteCommentAction({ postId, commentId }))
  }

  function scrollCommentsOnPost() {
    if (lastCommentRef.current) {
      lastCommentRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }
  function onSubmitDispatch(postId: string, comment: string) {
    appDispatch(
      postCommentAction(
        { postId, text: comment },
        scrollCommentsOnPost,
        sendCommentNotification,
      ),
    )
  }
  function sendCommentNotification(postId: string, commentId: string) {
    socket.emit("comment", { _id: postId, commentId })
  }
  const isItFirstComment = (comments || []).length === 0

  return (
    <section className="comments__modal">
      {showClose ? (
        <>
          <AiOutlineClose
            size={20}
            className="cursor__pointer"
            onClick={() => appDispatch(toggleCommentsModal())}
          />
          <h1>{`${user?.name}'s Post`}</h1>
        </>
      ) : null}
      <CommentsList
        onDeleteComment={onDeleteComment}
        comments={comments || []}
        ref={lastCommentRef}
      />
      {isItFirstComment ? (
        <p className="comments__first">Be the first one to comment</p>
      ) : (
        <p className="comments__total">
          Total Comments - {(comments || []).length}
        </p>
      )}
      <CommentsForm postId={postId || ""} onSubmitDispatch={onSubmitDispatch} />
    </section>
  )
}
