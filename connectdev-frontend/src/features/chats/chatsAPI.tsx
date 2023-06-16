import instance from "../../axios"

export const loadUserContacts = () => {
  return instance.get("/api/chats")
}
