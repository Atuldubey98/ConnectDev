import instance from "../../axios"

export const loadFriends = () => {
  return instance.get("/api/friends")
}

export const createContact = (recipientUserId: string) => {
  return instance.post("/api/contacts", {
    recipientUserId,
  })
}
