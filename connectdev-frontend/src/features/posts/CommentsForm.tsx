import { ChangeEventHandler, useEffect, useRef, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { UserAvatarSmall } from "./CreatePost"
import { postCommentAction } from "./postSlice"

type CommentsFormProps = {
  postId: string
}
export default function CommentsForm({ postId }: CommentsFormProps) {
  const { user } = useAppSelector((state) => state.login)
  const { newCommentStatus } = useAppSelector((state) => state.post)
  const loading: boolean = newCommentStatus === "loading"
  const [comment, setComment] = useState<string>("")
  const formRef = useRef<HTMLFormElement>(null)

  const appDispatch = useAppDispatch()
  const onChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setComment(e.target.value)
  }
  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    appDispatch(postCommentAction({ postId, text: comment }))
    setComment("")
  }
  const onKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === "Enter" && e.shiftKey === false) {
      e.preventDefault()
      if (formRef.current) {
        formRef.current.requestSubmit()
      }
    }
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} className="comments__form">
      <div className="comments__head">
        <UserAvatarSmall name={user?.name || ""} avatar={user?.avatar} />
        <div className="comment__field">
          <textarea onKeyDown={onKeyDown} onChange={onChange} value={comment} />
        </div>
      </div>
      <div className="comments_footer">
        <button disabled={loading} type="submit" className="btn">
          Post
        </button>
      </div>
    </form>
  )
}
