import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import CommentsModal from "./CommentsModal"
import CreatePost from "./CreatePost"

import { useEffect } from "react"
import { BsFillFilePostFill } from "react-icons/bs"
import { ClockLoader } from "react-spinners"
import Notfound from "../common/Notfound"
import useInfiniteScroll from "../common/useInfiniteScroll"
import FilterComp from "./FilterComp"
import PostsList from "./PostsList"
import "./PostsPage.css"
import { getAllPosts, searchPostByNameAction, setIdle } from "./postSlice"
import Header from "../common/Header"
import Container from "../common/Container"
export default function PostsPage() {
  const { commentsModal, justAddedPost } = useAppSelector((state) => state.ui)

  const { postResponse, status, hasNextPost } = useAppSelector(
    (state) => state.post,
  )
  const { isCommentsModalOpen } = commentsModal
  const { search: searchParams, user: userParam } = useParams()
  const search: string = searchParams || ""
  const user: string = userParam || ""

  const { page, setElement } = useInfiniteScroll(hasNextPost)
  const appDispatch = useAppDispatch()
  const loading = status === "loading"
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
  return (
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
        <div className="d-flex-center">
          <ClockLoader loading={loading} color="var(--secondary-color)" />
        </div>
        {isCommentsModalOpen ? <CommentsModal /> : null}
      </main>
    </Container>
  )
}
