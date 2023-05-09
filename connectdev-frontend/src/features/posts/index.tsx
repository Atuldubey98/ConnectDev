import CreatePost from "./CreatePost"
import FilterComp from "./FilterComp"
import PostsList from "./PostsList"
import "./PostsPage.css"
export default function PostsPage() {
  return (
    <main className="posts__page">
      <FilterComp />
      <CreatePost />
      <PostsList />
    </main>
  )
}
