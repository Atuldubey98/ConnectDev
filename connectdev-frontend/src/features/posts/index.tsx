import { lazy, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
const CommentsModal = lazy(() => import("./CommentsModal"));
import CreatePost from "./CreatePost"
import { BsFillFilePostFill } from "react-icons/bs"
import Container from "../common/Container"
import LoadingSkeleton from "../common/LoadingSkeleton"
import Notfound from "../common/Notfound"
import useInfiniteScroll from "../common/useInfiniteScroll"
import FilterComp from "./FilterComp"
import PostsList from "./PostsList"
import "./PostsPage.css"
import { getAllPosts, searchPostByNameAction, setIdle } from "./postSlice"
export default function PostsPage() {
  const { commentsModal, justAddedPost } = useAppSelector((state) => state.ui)

  const { postResponse, status, hasNextPost } = useAppSelector(
    (state) => state.post,
  )
  const { isCommentsModalOpen } = commentsModal
  const { search = "", user = "" } = useParams()

  const { page, setElement } = useInfiniteScroll(hasNextPost)
  const appDispatch = useAppDispatch()
  const loading: boolean = status === "loading"
  useEffect(() => {
    appDispatch(
      search
        ? searchPostByNameAction(page, search, user)
        : getAllPosts(page, user),
    )
  }, [page, user])
  useEffect(() => {
    return () => {
      appDispatch(setIdle())
    }
  }, [user])
  const posts = postResponse?.posts || []
  return  (
    <Container>
      <main className="posts__page">
        <FilterComp />
        <CreatePost />
        {posts.length === 0 ? (
          loading ? null : (
            <Notfound icon={BsFillFilePostFill} message="Posts Not found" />
          )
        ) : (
          <PostsList
            posts={posts}
            setElement={setElement}
            justAddedPost={justAddedPost}
          />
        )}
        <LoadingSkeleton loading={loading} />

        {isCommentsModalOpen ? <CommentsModal /> : null}
      </main>
    </Container>
  )
}
