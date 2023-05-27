import { AiFillLike, AiOutlineLike } from "react-icons/ai"
import { FaRegCommentAlt } from "react-icons/fa"
import { MdDelete } from "react-icons/md"

import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { IPost } from "./interfaces"
import { toggleCommentsModal, toggleCommentsModalPost } from "../ui/uiSlice"
import { deletePostAction, dolikeorDislikePost } from "./postSlice"

type PostBtnsProps = {
  post: IPost
  onDelete?: () => void
}

export default function PostBtns({ post, onDelete }: PostBtnsProps) {
  const { comments, likes, _id: postId, user: postUser } = post
  const { user } = useAppSelector((state) => state.login)
  const appDispatch = useAppDispatch()
  const onCommentsIconClick = () => {
    appDispatch(toggleCommentsModalPost(postId))
    appDispatch(toggleCommentsModal())
  }
  const onDeleteClick = () => {
    if (confirm("Are you sure you want to delete the post?")) {
      if (onDelete) {
        onDelete()
      }
      appDispatch(deletePostAction({ postId }))
    }
  }
  return (
    <div className="post__btns">
      <div
        onClick={() => appDispatch(dolikeorDislikePost(postId))}
        className="post__btn d-flex-center"
      >
        <span>{likes?.length}</span>
        {likes!.map((like) => like.user._id).indexOf(user?._id || "") === -1 ? (
          <AiOutlineLike size={20} />
        ) : (
          <AiFillLike size={20} />
        )}
      </div>
      {user?._id === postUser._id ? (
        <div onClick={onDeleteClick} className="post__btn d-flex-center">
          <MdDelete />
          <span>Delete</span>
        </div>
      ) : null}
      <div onClick={onCommentsIconClick} className="post__btn d-flex-center">
        <span>{comments?.length}</span>
        <FaRegCommentAlt size={20} />
      </div>
    </div>
  )
}
