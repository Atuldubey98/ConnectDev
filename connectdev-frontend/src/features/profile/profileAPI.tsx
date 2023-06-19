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

export const loadFriendshipStatus = async (friendUserId: string) => {
  return instance.get(`/api/friend-request/${friendUserId}`)
}

export const sendFriendRequest = async (friendUserId: string) => {
  return instance.post("/api/friend-request", {
    friendUserId,
  })
}

export const cancelFriendRequest = async (friendRequestId: string) => {
  return instance.delete(`/api/friend-request/${friendRequestId}`)
}
export const acceptFriendRequest = async (friendRequestId: string) => {
  return instance.post(`/api/friend-request/accept`, {
    friendRequestId,
  })
}
export const uploadProfileAvatar = async (profilePicture: any) => {
  const profileInformation = new FormData()
  profileInformation.append("avatar", profilePicture)
  return instance.post("/api/profile/avatar", profileInformation, {
    headers: { "Content-Type": "multipart/form-data" },
  })
}
export const updateProfileAvatar = async (profilePicture: any) => {
  const profileInformation = new FormData()
  profileInformation.append("avatar", profilePicture)
  return instance.patch("/api/profile/avatar", profileInformation, {
    headers: { "Content-Type": "multipart/form-data" },
  })
}
