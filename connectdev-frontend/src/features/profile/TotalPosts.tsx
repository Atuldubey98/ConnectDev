import LinkButton from "../common/LinkButton"
import "./TotalPosts.css"
export type TotalPostsProps = {
  total: number
  userId: string
}
export default function TotalPosts(props: TotalPostsProps) {
  return (
    <div className="total__posts">
      <LinkButton
        to={`/search/users/${props.userId}/posts`}
        label={`Total Posts : ${props.total}`}
      />
    </div>
  )
}
