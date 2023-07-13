import { Dispatch, SetStateAction, memo } from "react"
import Post from "./Post"
import "./PostsLists.css"
import { IPost } from "./interfaces"
export type PostListProps = {
  posts: IPost[]
  setElement: Dispatch<SetStateAction<HTMLDivElement | HTMLLIElement | null>>
  justAddedPost: {
    justAdded: boolean
    postId: string
  }
}

const PostsList = memo((props: PostListProps) => {
  const { posts, setElement, justAddedPost } = props
  const { justAdded, postId } = justAddedPost
  return (
    <section className="posts__list">
      <div className="posts">
        {posts.map((post, index) =>
          index === posts.length - 2 ? (
            <Post
              key={post._id}
              post={post}
              ref={setElement}
              justAddedPostId={justAdded && post._id === postId}
            />
          ) : (
            <Post
              key={post._id}
              post={post}
              justAddedPostId={justAdded && post._id === postId}
            />
          ),
        )}
      </div>
    </section>
  )
})

export default PostsList
