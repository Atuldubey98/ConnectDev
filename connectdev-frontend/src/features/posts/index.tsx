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
  
  return (
    <main className="posts__page">
      <FilterComp />
      <CreatePost />
      <PostsList />
      {isCommentsModalOpen &&
      postResponse &&
      postResponse.posts &&
      postResponse?.posts?.filter((post) => post._id === postId).length > 0 ? (
        <CommentsModal />
      ) : null}
    </main>
  )
}
