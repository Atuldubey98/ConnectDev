import instance from "../../axios"

export const loadUserContacts = () => {
  return instance.get("/api/contacts")
}

export const loadChatsByContactId = (contactId: string, page = 1) => {
  return instance.get(`/api/chats/${contactId}`, {
    params: { page },
  })
}
