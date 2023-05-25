import { ChangeEventHandler, useEffect, useReducer } from "react"
import { IProfile } from "../profile/interfaces"
import { loadProfile } from "../profile/profileAPI"
import {
  SkillBody,
  HandleBody,
  ExperienceBody,
  EducationBody,
} from "./interfaces"

export default function useProfileEdit() {
  type State = {
    skills: SkillBody[]
    handle: HandleBody[]
    status: string
    experience: ExperienceBody[]
    education: EducationBody[]
    skillErrTxt: string
    handleErrTxt: string
    statusErrTxt: string
    experienceErrTxt: string
    educationErrTxt: string
  }
  type Action =
    | { type: "add:skill"; payload: SkillBody }
    | { type: "add:education"; payload: EducationBody }
    | { type: "add:experience"; payload: ExperienceBody }
    | { type: "add:status"; payload: string }
    | { type: "add:handle"; payload: HandleBody }
    | { type: "remove:skill"; payload: string }
    | { type: "remove:education"; payload: string }
    | { type: "remove:experience"; payload: string }
    | { type: "remove:status"; payload: string }
    | { type: "remove:handle"; payload: string }
    | { type: "set:profile"; payload: IProfile }
  const defaultProfileState: State = {
    skills: [],
    handle: [],
    status: "",
    experience: [],
    education: [],
    skillErrTxt: "",
    handleErrTxt: "",
    statusErrTxt: "",
    experienceErrTxt: "",
    educationErrTxt: "",
  }

  function reducer(state: State, action: Action): State {
    switch (action.type) {
      case "add:skill":
        const validSkills =
          action.payload.skill.length === 0
            ? "Skill Cannot be left empty"
            : action.payload.yearsWorked <= 0
            ? "Years worked should be greater than 0"
            : ""
        return {
          ...state,
          skills:
            validSkills.length > 0
              ? state.skills
              : [...state.skills, action.payload],
          skillErrTxt: validSkills,
        }
      case "add:education":
        const validEducation =
          action.payload.degree.length === 0
            ? "Degree should be greater than 0"
            : action.payload.school.length === 0
            ? "School should be greater than 0"
            : ""
        return {
          ...state,
          education:
            validEducation.length > 0
              ? state.education
              : [...state.education, action.payload],
          educationErrTxt: validEducation,
        }
      case "add:experience":
        const experienceErrTxt =
          action.payload.company.length === 0
            ? "Company length should be greater than 0"
            : action.payload.title.length === 0
            ? "Title should be greater than 0"
            : ""
        return {
          ...state,
          experience:
            experienceErrTxt.length > 0
              ? state.experience
              : [...state.experience, action.payload],
          experienceErrTxt,
        }
      case "add:status":
        return {
          ...state,
          status: action.payload,
        }
      case "add:handle":
        const handleErrTxt =
          action.payload.platform.length === 0
            ? "Please mention the platform"
            : ""
        return {
          ...state,
          handle:
            handleErrTxt.length > 0
              ? state.handle
              : [...state.handle, action.payload],
          handleErrTxt,
        }
      case "remove:skill":
        return {
          ...state,
          skills: state.skills.filter((skill) => skill._id !== action.payload),
        }
      case "remove:education":
        return {
          ...state,
          education: state.education.filter(
            (edu) => edu._id !== action.payload,
          ),
        }
      case "remove:experience":
        return {
          ...state,
          experience: state.experience.filter(
            (edu) => edu._id !== action.payload,
          ),
        }
      case "remove:status":
        return {
          ...state,
          status: "",
        }
      case "remove:handle":
        return {
          ...state,
          handle: state.handle.filter((edu) => edu._id !== action.payload),
        }
      case "set:profile":
        const profile: IProfile = action.payload
        return {
          skills: profile?.skills
            ? profile.skills.map((s) => {
                const { _id, skill, yearsWorked } = s
                return { _id, skill, yearsWorked }
              })
            : [],
          handle: profile?.handle
            ? profile.handle.map((h) => {
                const { _id, username, link, platform } = h
                return { _id, username, link, platform }
              })
            : [],
          status: profile?.status || "",
          experience: profile?.experience
            ? profile.experience.map((exp) => {
                const { _id, title, company, description } = exp
                return { _id, title, company, description }
              })
            : [],
          education: profile?.education
            ? profile.education.map((edu) => {
                const { _id, area, degree, description, school } = edu
                return { _id, area, degree, description, school }
              })
            : [],
          skillErrTxt: "",
          handleErrTxt: "",
          statusErrTxt: "",
          experienceErrTxt: "",
          educationErrTxt: "",
        }
      default:
        return state
    }
  }

  useEffect(() => {
    ;(async () => {
      const { data } = await loadProfile()
      dispatch({ type: "set:profile", payload: data })
    })()
  }, [])
  const onChangeStatus: ChangeEventHandler<HTMLInputElement> = (e) => {
    dispatch({ type: "add:status", payload: e.currentTarget.value })
  }
  const [state, dispatch] = useReducer(reducer, defaultProfileState)
  function addSkillDispatch(skill: SkillBody) {
    dispatch({ type: "add:skill", payload: skill })
  }
  return { state, onChangeStatus, addSkillDispatch }
}
