import { lazy } from "react";
import ReactModal from "react-modal"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { toggleCommentsModal } from "../ui/uiSlice"
const CommentSection = lazy(() => import("./CommentSection"));
import "./CommentsModal.css"

export default function CommentsModal() {
  const { commentsModal } = useAppSelector((state) => state.ui)
  const { isCommentsModalOpen, postId } = commentsModal
  const { postResponse } = useAppSelector((state) => state.post)
  const appDispatch = useAppDispatch()

  const post = postResponse?.posts
    ? postResponse.posts.find((post) => post._id === postId)
    : null
  const comments = post && post.comments ? post.comments : []

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      maxWidth: "720px",
      width: "100%",
      transform: "translate(-50%, -50%)",
    },
  }

  return (
    <ReactModal
      style={customStyles}
      onRequestClose={() => appDispatch(toggleCommentsModal())}
      isOpen={isCommentsModalOpen}
    >
      <CommentSection comments={comments} user={post?.user} postId={postId} />
    </ReactModal>
  )
}
