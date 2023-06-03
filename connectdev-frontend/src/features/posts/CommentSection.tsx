import { useRef } from "react"
import { AiOutlineClose } from "react-icons/ai"
import { useAppDispatch } from "../../app/hooks"
import { toggleCommentsModal } from "../ui/uiSlice"
import CommentsForm from "./CommentsForm"
import CommentsList from "./CommentsList"
import { IComment, IUserDetails } from "./interfaces"
import { deleteCommentAction, postCommentAction } from "./postSlice"
import useUserToast from "../common/useUserToast"
import socket from "../../socket"

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
  const { showToast } = useUserToast()
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
      <CommentsForm postId={postId || ""} onSubmitDispatch={onSubmitDispatch} />
    </section>
  )
}
