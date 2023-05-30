import { useEffect } from "react"
import { ClockLoader } from "react-spinners"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import Post from "./Post"
import "./PostsLists.css"
import { getAllPosts, searchPostByNameAction, setIdle } from "./postSlice"
import useScrollPage from "./useScrollPage"
import Notfound from "../common/Notfound"
import { BsFillFilePostFill } from "react-icons/bs"
export type PostListProps = {
  search: string
}
export default function PostsList(props: PostListProps) {
  const { search } = props
  const { status, postResponse } = useAppSelector((state) => state.post)
  const appDispatch = useAppDispatch()
  const loading = status === "loading"
  const { page } = useScrollPage()

  useEffect(() => {
    if (postResponse && !postResponse.hasNextPage) {
      return
    } else {
      appDispatch(
        search ? searchPostByNameAction(page, search) : getAllPosts(page),
      )
    }
  }, [page])
  useEffect(() => {
    return () => {
      appDispatch(setIdle())
    }
  }, [])
  return (
    <section className="posts__list">
      {postResponse && postResponse.posts && postResponse.posts.length === 0 ? (
        <Notfound icon={BsFillFilePostFill} message="Posts Not found" />
      ) : (
        <div className="posts">
          {postResponse?.posts &&
            postResponse.posts.map((post) => (
              <Post key={post._id} post={post} />
            ))}
        </div>
      )}
      <div className="d-flex-center">
        <ClockLoader loading={loading} color="var(--accent-color)" />
      </div>
    </section>
  )
}
