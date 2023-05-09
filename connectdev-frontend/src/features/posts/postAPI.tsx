import instance from "../../axios"

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
