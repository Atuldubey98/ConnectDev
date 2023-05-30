import { IUserDetails } from "../posts/interfaces"

export interface IUsersResponse {
  users?: IUserDetails[] | null
  totalDocs: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage?: null
  nextPage: number
}
