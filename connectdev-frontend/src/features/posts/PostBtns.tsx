import { AiFillLike, AiOutlineLike } from "react-icons/ai"
import { FaRegCommentAlt } from "react-icons/fa"
import { ILikes, IUserDetails } from "../../interfaces/post"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { dolikeorDislikePost } from "./postSlice"

type PostBtnsProps = {
  likes?: ILikes[] | null
  comments?: IUserDetails[] | null
  postId: string
}

export default function PostBtns({ likes, comments, postId }: PostBtnsProps) {
  const { user } = useAppSelector((state) => state.login)
  const appDispatch = useAppDispatch()
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
      <div className="post__btn d-flex-center">
        <span>{comments?.length}</span>
        <FaRegCommentAlt size={20} />
      </div>
    </div>
  )
}
