import IUser from "../login/interfaces"
import { UserWithActiveStatus } from "../posts/interfaces"

export type Contact = {
  _id: string
  name?: string
  members: Member[] | null
  createdAt: Date
  updatedAt: Date
  isGroup: boolean
  messagesResponse: MessagesResponse | null
}

export interface Member extends UserWithActiveStatus {}

export type Sender = IUser
export type RecipientsRead = IUser
export interface MessagesResponse {
  messages?: Message[] | null
  totalDocs: number
  limit: number
  contactId: string | null
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage?: number
  nextPage?: number
}
export interface Message {
  _id: string
  isRead?: RecipientsRead[] | null
  sender: Sender
  content: string
  contact: string
  createdAt: string
  updatedAt: string
}
