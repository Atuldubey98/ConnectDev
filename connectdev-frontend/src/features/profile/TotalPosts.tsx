import LinkButton from "../common/LinkButton"
import "./TotalPosts.css"
export type TotalPostsProps = {
  total: number
}
export default function TotalPosts(props: TotalPostsProps) {
  return (
    <div className="total__posts">
      <LinkButton to="#" label={`Total Posts : ${props.total}`} />
    </div>
  )
}
