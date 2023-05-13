import instance from "../../axios"
import { ICreatePost } from "../../interfaces/post"

export const fetchAllPosts = (page: number) => {
  try {
    return instance.get("/api/post/all", {
      params: {
        page,
      },
    })
  } catch (error) {
    throw error
  }
}
export const likeOrDislikePost = (postId: string) => {
  try {
    return instance.post("/api/post/like", {
      postId,
    })
  } catch (error) {
    throw error
  }
}
export const createNewPost = (post: ICreatePost) => {
  try {
    return instance.post("/api/post", {
      ...post,
      tags: post.tags.map((tag) => tag.tag),
    })
  } catch (error) {
    throw error
  }
}
