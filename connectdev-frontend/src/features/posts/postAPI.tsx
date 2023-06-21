import instance from "../../axios"
import { ICreatePost } from "./interfaces"

export const fetchAllPosts = (page: number, user: string) => {
  try {
    return user
      ? instance.get("/api/posts", {
          params: {
            page,
            filter: { user },
          },
        })
      : instance.get("/api/posts", {
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
    return instance.get(`/api/posts/${postId}`)
  } catch (error) {
    throw error
  }
}
export const likeOrDislikePost = (postId: string) => {
  try {
    return instance.post(`/api/posts/${postId}/like`)
  } catch (error) {
    throw error
  }
}
export const createNewPost = (post: ICreatePost) => {
  try {
    return instance.post("/api/posts", {
      ...post,
      tags: post.tags.map((tag) => tag.tag),
    })
  } catch (error) {
    throw error
  }
}

export const makeNewComment = (body: { postId: string; text: string }) => {
  try {
    return instance.post(`/api/posts/${body.postId}/comment`, {
      text: body.text,
    })
  } catch (error) {
    throw error
  }
}
export const deleteComment = (body: { postId: string; commentId: string }) => {
  try {
    return instance.delete(
      `/api/posts/${body.postId}/comment/${body.commentId}`,
    )
  } catch (error) {
    throw error
  }
}
export const deletePost = (body: { postId: string }) => {
  try {
    return instance.delete(`/api/posts/${body.postId}`)
  } catch (error) {
    throw error
  }
}
