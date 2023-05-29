export interface SkillBody {
  _id: string
  skill: string
  yearsWorked: number
}

export type HandleBody = {
  _id: string
  username: string
  link: string
  platform: string
}

export type ExperienceBody = {
  _id: string
  title: string
  company: string
  description: string
}

export type EducationBody = {
  _id: string
  degree: string
  school: string
  area: string
  description: string
}
export type UpdateProfileBody = {
  skills: SkillBody[]
  handle: HandleBody[]
  experience: ExperienceBody[]
  education: EducationBody[]
  status: string
}
