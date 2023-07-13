import { AiFillLike, AiOutlineLike } from "react-icons/ai"
import { FaRegCommentAlt } from "react-icons/fa"
import { MdDelete } from "react-icons/md"

import { useAppDispatch, useAppSelector } from "../../app/hooks"
import socket from "../../socket"
import { toggleCommentsModal, toggleCommentsModalPost } from "../ui/uiSlice"
import { IPost, LikeNotificationPayload } from "./interfaces"
import { deletePostAction, dolikeorDislikePost } from "./postSlice"
import useUserToast from "../common/useUserToast"
import { memo } from "react"
import { IconType } from "react-icons"

type PostBtnsProps = {
  post: IPost
  onDelete?: () => void
}

export default function PostBtns({ post, onDelete }: PostBtnsProps) {
  const { comments, likes, _id: postId, user: postUser } = post
  const { user } = useAppSelector((state) => state.login)
  const { showToast } = useUserToast()
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

  function sendLikeNotification(data: LikeNotificationPayload) {
    socket.emit("like", data)
  }
  return (
    <div className="post__btns">
      <div
        onClick={() =>
          appDispatch(
            dolikeorDislikePost(postId, sendLikeNotification, showToast),
          )
        }
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
        <PostBtn onClick={onDeleteClick} Icon={MdDelete} text={"Delete"} />
      ) : null}
      <PostBtn
        onClick={onCommentsIconClick}
        text={comments?.length.toString() || "0"}
        Icon={FaRegCommentAlt}
      />
    </div>
  )
}

type PostBtnProps = {
  text: string
  Icon: IconType
  onClick: VoidFunction
}
const PostBtn = memo((props: PostBtnProps) => {
  const { Icon } = props
  return (
    <div onClick={props.onClick} className="post__btn d-flex-center">
      <Icon size={20} />
      <span>{props.text}</span>
    </div>
  )
})
