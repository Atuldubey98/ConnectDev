import IUser from "../login/interfaces"
import { SkillBody } from "../profileEdit/interfaces"

export interface IProfile {
  _id: string
  skills?: SkillsEntity[] | null
  user: IUser
  handle?: HandleEntity[] | null
  status: string
  experience?: ExperienceEntity[] | null
  education?: EducationEntity[] | null
  date: string
  createdAt: string
  updatedAt: string
  __v: number
}
export interface SkillsEntity extends SkillBody {
  user: string
  __v: number
  createdAt: string
  updatedAt: string
}
export interface HandleEntity {
  _id: string
  username: string
  link: string
  platform: string
  user: string
  __v: number
  createdAt: string
  updatedAt: string
}
export interface ExperienceEntity {
  _id: string
  title: string
  company: string
  description: string
  user: string
  __v: number
}
export interface EducationEntity {
  _id: string
  degree: string
  area: string
  school: string
  description: string
  user: string
  __v: number
  createdAt: string
  updatedAt: string
}
