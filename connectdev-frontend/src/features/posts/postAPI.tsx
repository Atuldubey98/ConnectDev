import instance from "../../axios"

export const fetchAllPosts = () => {
  try {
    return instance.get("/api/posts/all")
  } catch (error) {
    throw error
  }
}
