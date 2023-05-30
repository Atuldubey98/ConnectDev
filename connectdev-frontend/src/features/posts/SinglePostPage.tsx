import moment from "moment"
import { useCallback, useEffect, useRef, useState } from "react"
import { AiFillLike, AiOutlineLike } from "react-icons/ai"
import { FaRegCommentAlt } from "react-icons/fa"
import { useParams } from "react-router-dom"
import { useAppSelector } from "../../app/hooks"
import ButtonWithIcon from "../common/ButtonWithIcon"
import FullLoading from "../common/FullLoading"
import CommentsForm from "./CommentsForm"
import CommentsList from "./CommentsList"
import { UserAvatarSmall } from "./CreatePost"
import "./SinglePostPage.css"
import { ILikes, IPost } from "./interfaces"
import {
  deleteComment,
  fetchPost,
  likeOrDislikePost,
  makeNewComment,
} from "./postAPI"
import PostTags from "./PostTags"
import useEdit from "../profileEdit/useEdit"
import Notfound from "../common/Notfound"
import { BsFillFilePostFill } from "react-icons/bs"
export default function SinglePostPage() {
  const { postId } = useParams()
  const [post, setPost] = useState<IPost | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const { user } = useAppSelector((state) => state.login)
  const liked: boolean | undefined = post?.likes
    ? post.likes.map((like) => like.user._id).indexOf(user ? user._id : "") !==
      -1
    : false
  const lastCommentRef = useRef<HTMLDivElement>(null)
  async function onSubmitDispatch(postId: string, comment: string) {
    const { data } = await makeNewComment({ postId, text: comment })
    const newComment = data.comment
    if (post) {
      setPost({
        ...post,
        comments:
          post && post.comments ? [...post.comments, newComment] : [newComment],
      })
      setTimeout(() => {
        if (lastCommentRef.current) {
          lastCommentRef.current.scrollIntoView({ behavior: "smooth" })
        }
      }, 500)
    }
  }
  async function createLikeOrDislike() {
    if (!post || !postId) {
      return
    }
    const { data } = await likeOrDislikePost(postId)
    const isLiked = data.status
    const likeUnlike: ILikes = { user: data.user, post: postId }
    setPost({
      ...post,
      likes: isLiked
        ? [...(post.likes || []), likeUnlike]
        : [...(post.likes || [])].filter((like) => like.user._id !== user?._id),
    })
  }
  async function onDeleteComment(postId: string, commentId: string) {
    try {
      await deleteComment({ postId, commentId })
      setPost(
        post
          ? {
              ...post,
              comments: (post?.comments || []).filter(
                (comment) => comment._id !== commentId,
              ),
            }
          : post,
      )
    } catch (error) {
      console.log(error)
    }
  }
  const { edit, toggleEdit } = useEdit()
  useEffect(() => {
    ;(async () => {
      if (!postId) return
      try {
        const { data } = await fetchPost(postId)
        setPost(data)
      } catch (error) {
      } finally {
        setLoading(false)
      }
    })()
  }, [])
  return loading ? (
    <FullLoading />
  ) : post ? (
    <main className="single__postPage">
      <div className="single__postWrapper">
        <div className="single__post">
          <h2>{post?.title}</h2>
          <p>{post?.text}</p>
        </div>
        <PostTags tags={post?.tags || []} />
      </div>
      <div className="single__postAbout">
        <div className="single__postAvatar">
          <div className="post__avatar">
            <UserAvatarSmall
              name={post?.user.name || ""}
              avatar={post?.user.avatar}
              size={40}
            />
            <div className="single__avatarSection">
              <p>{post?.user.name}</p>
              <p className="post__date">{moment(post?.createdAt).fromNow()}</p>
            </div>
          </div>
          <div className="single__postBtns d-flex-center">
            <Like liked={liked} createLikeOrDislike={createLikeOrDislike} />
            <ButtonWithIcon onClick={() => toggleEdit(!edit)}>
              <FaRegCommentAlt size={20} />
              <span>Comment</span>
            </ButtonWithIcon>
          </div>
        </div>

        <CommentsList
          comments={post?.comments || []}
          onDeleteComment={onDeleteComment}
          maxHeight="50svh"
          ref={lastCommentRef}
        />

        {edit ? (
          <CommentsForm
            postId={postId || ""}
            onSubmitDispatch={onSubmitDispatch}
          />
        ) : null}
      </div>
    </main>
  ) : (
    <Notfound icon={BsFillFilePostFill} message="Post not found" />
  )
}

function Like({
  liked,
  createLikeOrDislike,
}: {
  liked: boolean
  createLikeOrDislike: () => void
}) {
  return (
    <ButtonWithIcon onClick={createLikeOrDislike}>
      {liked ? (
        <AiFillLike size={20} color="var(--accent-color)" />
      ) : (
        <AiOutlineLike size={20} />
      )}
      <span
        style={{
          color: liked ? "var(--accent-color)" : undefined,
        }}
      >
        Like
      </span>
    </ButtonWithIcon>
  )
}
