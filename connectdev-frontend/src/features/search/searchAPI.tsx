import instance from "../../axios"

export const searchByUser = (search: string, page = 1) => {
  return instance.get(`/api/users/search/${search}`, {
    params: {
      page,
    },
  })
}
export const searchByPost = (search: string, page = 1) => {
  return instance.get(`/api/post/search/${search}`, {
    params: {
      page,
    },
  })
}