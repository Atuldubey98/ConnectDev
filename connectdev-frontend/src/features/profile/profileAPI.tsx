import instance from "../../axios"
import { UpdateProfileBody } from "../profileEdit/interfaces"

export const loadProfile = async (userId: string | undefined) => {
  return instance.get(
    userId ? `/api/profile/random-user/${userId}` : "/api/profile",
  )
}
export const updateProfile = async (profile: UpdateProfileBody) => {
  return instance.post("/api/profile", profile)
}

export const countTotalPostByUserId = async (userId: string | undefined) => {
  return instance.get(`/api/post/count/${userId}`)
}
