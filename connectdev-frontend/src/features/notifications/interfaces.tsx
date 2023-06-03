export interface NotificationsResponse {
  notifications?: NotificationsEntity[] | null
  totalCount: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage?: null
  nextPage?: null
}
export interface NotificationsEntity {
  _id: string
  user: string
  href: string
  message: string
  read: boolean
  createdAt: Date
  updatedAt: Date
}
