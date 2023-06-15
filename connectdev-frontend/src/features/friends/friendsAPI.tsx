import instance from "../../axios"

export const loadFriends = () => {
  return instance.get("/api/friends")
}
