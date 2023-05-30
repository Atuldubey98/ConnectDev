import { useParams } from "react-router-dom"
import { useAppSelector } from "../../app/hooks"
import CommentsModal from "./CommentsModal"
import CreatePost from "./CreatePost"
import FilterComp from "./FilterComp"
import PostsList from "./PostsList"
import "./PostsPage.css"
export default function PostsPage() {
  const { commentsModal } = useAppSelector((state) => state.ui)
  const { postResponse } = useAppSelector((state) => state.post)
  const { isCommentsModalOpen, postId } = commentsModal
  const { search: searchParams } = useParams()
  const search: string = searchParams || ""
  return (
    <main className="posts__page">
      <FilterComp />
      <CreatePost />
      <PostsList search={search} />
      {isCommentsModalOpen &&
      postResponse &&
      postResponse.posts &&
      postResponse?.posts?.filter((post) => post._id === postId).length > 0 ? (
        <CommentsModal />
      ) : null}
    </main>
  )
}
