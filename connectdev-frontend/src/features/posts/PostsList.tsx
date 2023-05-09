import { useEffect } from "react"
import "./PostsLists.css"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { getAllPosts } from "./postSlice"
import { ClockLoader } from "react-spinners"
import Post from "./Post"
import useScrollPage from "./useScrollPage"
export default function PostsList() {
  const { status, postResponse } = useAppSelector((state) => state.post)
  const appDispatch = useAppDispatch()
  const loading = status === "loading"
  const { page } = useScrollPage()
  useEffect(() => {
    if (postResponse && postResponse.totalPages < page) {
      return
    } else {
      appDispatch(getAllPosts(page))
    }
  }, [page])

  return (
    <section className="posts__list">
      {postResponse && postResponse.posts && postResponse.posts.length === 0 ? (
        <div></div>
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
