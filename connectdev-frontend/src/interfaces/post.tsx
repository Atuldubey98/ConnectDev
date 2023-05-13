export interface IPostResponse {
  totalCount: number
  count: number
  totalPages: number
  posts?: IPost[] | null
  page: number
  status: boolean
}
export interface ILikes {
  user: {
    _id: string
    name: string
    email: string
  }
  post: string
}
export interface IPost {
  _id: string
  text: string
  user: IUserDetails
  likes?: ILikes[] | null
  comments?: IUserDetails[] | null
  date: string
  tags?: string[] | null
  title: string
  color: string
  __v: number
}
export interface ICreatePost {
  title: string
  text: string
  tags: { id: string; tag: string }[]
}
export interface ICreatePostForm extends ICreatePost {
  tag: string
  tagErrTxt: string
  titleErrTxt: string
  textErrTxt: string
}
export interface IUserDetails {
  name: string
  email: string
  _id: string
  avatar?: string
}
export interface ILikePost {
  postId: string
  user: IUserDetails
}
