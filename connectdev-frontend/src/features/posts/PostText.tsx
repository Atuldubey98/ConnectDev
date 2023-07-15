import { Link } from "react-router-dom"
import "./PostText.css"
type PostTextProps = {
  postId: string
  text: string
  numberOfLines?: number
}

const PostText = (props: PostTextProps) => {
  const { postId, text, numberOfLines } = props
  const to: string = `/posts/${postId}`
  return (
    <Link className="post__text" to={to}>
      <p className="text-truncate-6">{text}</p>
    </Link>
  )
}

export default PostText
