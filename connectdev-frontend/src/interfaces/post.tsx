export interface IPostResponse {
  totalCount: number
  count: number
  totalPages: number
  posts?: IPostsEntity[] | null
  page: number
  status: boolean
}
export interface IPostsEntity {
  _id: string
  text: string
  user: string
  likes?: null[] | null
  comments?: null[] | null
  date: string
  tags?: string[] | null
  title: string
  color: string
  __v: number
}
