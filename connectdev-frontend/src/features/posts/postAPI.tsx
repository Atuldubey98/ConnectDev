import instance from "../../axios"
import { ICreatePost } from "./interfaces"

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
export const fetchPost = (postId: string) => {
  try {
    return instance.get("/api/post", {
      params: {
        postId,
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

export const makeNewComment = (body: { postId: string; text: string }) => {
  try {
    return instance.post("/api/post/comment", body)
  } catch (error) {
    throw error
  }
}
export const deleteComment = (body: { postId: string; commentId: string }) => {
  try {
    return instance.delete("/api/post/comment", {
      params: body,
    })
  } catch (error) {
    throw error
  }
}
export const deletePost = (body: { postId: string }) => {
  try {
    return instance.delete("/api/post", {
      params: body,
    })
  } catch (error) {
    throw error
  }
}
