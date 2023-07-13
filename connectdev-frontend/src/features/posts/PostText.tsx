import { memo } from "react"
import "./PostText.css"
import { Link } from "react-router-dom"
import TextTruncate from "react-text-truncate"
type PostTextProps = {
  postId: string
  text: string
  numberOfLines?: number
}

const PostText = memo((props: PostTextProps) => {
  const { postId, text, numberOfLines } = props
  const to: string = `/posts/${postId}`
  return (
    <Link className="post__text" to={to}>
      <TextTruncate
        text={text}
        element={"p"}
        truncateText="..."
        line={numberOfLines || 5}
      />
    </Link>
  )
})

export default PostText
