import { useEffect } from "react"
import { BsFillFilePostFill } from "react-icons/bs"
import { ClockLoader } from "react-spinners"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import Notfound from "../common/Notfound"
import useInfiniteScroll from "../common/useInfiniteScroll"
import Post from "./Post"
import "./PostsLists.css"
import { getAllPosts, searchPostByNameAction, setIdle } from "./postSlice"
export type PostListProps = {
  search: string
  user: string
}
export default function PostsList(props: PostListProps) {
  const { search, user } = props
  const { status, postResponse, hasNextPost } = useAppSelector(
    (state) => state.post,
  )
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
  return (
    <section className="posts__list">
      {postResponse && postResponse.posts && postResponse.posts.length === 0 ? (
        <Notfound icon={BsFillFilePostFill} message="Posts Not found" />
      ) : (
        <div className="posts">
          {postResponse?.posts &&
            postResponse.posts.map((post, index) =>
              index === postResponse.posts!.length - 1 ? (
                <Post key={post._id} post={post} ref={setElement} />
              ) : (
                <Post key={post._id} post={post} />
              ),
            )}
        </div>
      )}
      <div className="d-flex-center">
        <ClockLoader loading={loading} color="var(--accent-color)" />
      </div>
    </section>
  )
}
