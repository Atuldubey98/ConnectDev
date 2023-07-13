import { memo } from "react"
import TextTruncate from "react-text-truncate"

type PostTitleProps = {
  title: string
}

const PostTitle = memo((props: PostTitleProps) => {
  const { title } = props
  return (
    <TextTruncate text={title} element={"h3"} truncateText="..." line={2} />
  )
})

export default PostTitle
