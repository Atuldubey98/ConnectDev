import { formatDistanceToNow } from "date-fns"
import { useEffect, useRef, useState } from "react"
import { AiFillLike, AiOutlineLike } from "react-icons/ai"
import { BsFillFilePostFill } from "react-icons/bs"
import { FaRegCommentAlt } from "react-icons/fa"
import { useParams } from "react-router-dom"
import { useAppSelector } from "../../app/hooks"
import ButtonWithIcon from "../common/ButtonWithIcon"
import FullLoading from "../common/FullLoading"
import Notfound from "../common/Notfound"
import CommentsForm from "./CommentsForm"
import CommentsList from "./CommentsList"
import { UserAvatarSmall } from "./CreatePost"
import PostTags from "./PostTags"
import "./SinglePostPage.css"
import { ILikes, IPost } from "./interfaces"
import {
  deleteComment,
  fetchPost,
  likeOrDislikePost,
  makeNewComment,
} from "./postAPI"
export default function SinglePostPage() {
  const { postId } = useParams()
  const [post, setPost] = useState<IPost | null>(null)
  const commentInputRef = useRef<HTMLTextAreaElement>(null)
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
  function onCommentClick() {
    if (commentInputRef.current) {
      commentInputRef.current.focus()
    }
  }
  useEffect(() => {
    ; (async () => {
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
      <div className="single__postContainer">
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
                <p className="post__date">
                  {formatDistanceToNow(new Date(post.createdAt || ""), { addSuffix: true })}
                </p>
              </div>
            </div>
            <div className="single__postBtns d-flex-center">
              <Like
                totalLikes={post.likes?.length || 0}
                liked={liked}
                createLikeOrDislike={createLikeOrDislike}
              />
              <ButtonWithIcon onClick={onCommentClick}>
                <FaRegCommentAlt size={20} />
                <span>Comment</span>
                <span>{post.comments?.length || 0}</span>
              </ButtonWithIcon>
            </div>
          </div>
          <CommentsList
            comments={post?.comments || []}
            onDeleteComment={onDeleteComment}
            maxHeight="30svh"
            ref={lastCommentRef}
          />
          <CommentsForm
            ref={commentInputRef}
            postId={postId || ""}
            onSubmitDispatch={onSubmitDispatch}
          />
        </div>
      </div>
    </main>
  ) : (
    <Notfound icon={BsFillFilePostFill} message="Post was deleted" />
  )
}

function Like({
  liked,
  createLikeOrDislike,
  totalLikes,
}: {
  liked: boolean
  totalLikes: number
  createLikeOrDislike: () => void
}) {
  return (
    <ButtonWithIcon onClick={createLikeOrDislike}>
      {liked ? (
        <AiFillLike size={20} color="var(--secondary-color)" />
      ) : (
        <AiOutlineLike size={20} />
      )}
      <span
        style={{
          color: liked ? "var(--secondary-color)" : undefined,
        }}
      >
        Like
      </span>
      <span
        style={{
          color: liked ? "var(--secondary-color)" : undefined,
        }}
      >
        {totalLikes}
      </span>
    </ButtonWithIcon>
  )
}
