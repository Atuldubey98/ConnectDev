type PostTitleProps = {
  title: string
}

const PostTitle = (props: PostTitleProps) => {
  const { title } = props
  return <h3 className="text-truncate-2">{title}</h3>
}

export default PostTitle
