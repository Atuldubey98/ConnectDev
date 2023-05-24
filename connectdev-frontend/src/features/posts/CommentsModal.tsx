import ReactModal from "react-modal"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { toggleCommentsModal } from "../ui/uiSlice"
import CommentsForm from "./CommentsForm"
import CommentsList from "./CommentsList"
import "./CommentsModal.css"

export default function CommentsModal() {
  const { commentsModal } = useAppSelector((state) => state.ui)
  const { postResponse } = useAppSelector((state) => state.post)
  const appDispatch = useAppDispatch()
  const { isCommentsModalOpen, postId } = commentsModal
  const post = postResponse?.posts
    ? postResponse.posts.find((post) => post._id === postId)
    : null
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
      <section className="comments__modal">
        <CommentsForm postId={post?._id || ""} />
        <CommentsList comments={post?.comments || []} />
      </section>
    </ReactModal>
  )
}
