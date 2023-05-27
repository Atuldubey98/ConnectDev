import instance from "../../axios"

export const loadProfile = async (userId: string | undefined) => {
  return instance.get(userId ? `/api/profile/random-user/${userId}` : "/api/profile")
}
