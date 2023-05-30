import { MdOutlineExpandMore } from "react-icons/md"
import { useParams } from "react-router-dom"
import LinkButton from "../common/LinkButton"
import { IPostResponse } from "../posts/interfaces"
import "./PostsList.css"
import PostListUl from "./PostListUl"
type PostsListProps = {
  postsResponse: IPostResponse | null
}
export default function PostsList({ postsResponse }: PostsListProps) {
  const { search: searchParams } = useParams()
  const search = searchParams || ""
  return postsResponse &&
    postsResponse.posts &&
    postsResponse.posts.length > 0 ? (
    <section>
      <h2>Posts</h2>
      <PostListUl posts={postsResponse.posts} />
      {postsResponse.totalCount > 10 ? (
        <div className="d-flex-center">
          <LinkButton label="Show more" to={`/search/posts/${search}`}>
            <MdOutlineExpandMore />
          </LinkButton>
        </div>
      ) : null}
    </section>
  ) : null
}
