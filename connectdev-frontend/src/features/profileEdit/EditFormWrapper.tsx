import { FormEventHandler } from "react"
import { GrAddCircle } from "react-icons/gr"
import CommonHeading from "../profile/CommonHeading"
import { Handle } from "../profile/ProfileHandles"
import {
  EducationBody,
  ExperienceBody,
  HandleBody,
  SkillBody,
} from "./interfaces"
import useEdit from "./useEdit"
import { Experience } from "../profile/ProfileExperience"
import { Education } from "../profile/ProfileEducation"

export type FormType =
  | {
      type: "skills"
      body: SkillBody[]
      add: (skill: SkillBody) => void
      update: (skill: SkillBody) => void
      remove: (skillId: string) => void
    }
  | {
      type: "handles"
      body: HandleBody[]
      add: (handle: HandleBody) => void
      update: (skill: HandleBody) => void
      remove: (skillId: string) => void
    }
  | {
      type: "educations"
      body: EducationBody[]
      add: (education: EducationBody) => void
      update: (skill: EducationBody) => void
      remove: (skillId: string) => void
    }
  | {
      type: "experiences"
      body: ExperienceBody[]
      add: (experience: ExperienceBody) => void
      update: (skill: ExperienceBody) => void
      remove: (skillId: string) => void
    }
export type EntityType =
  | { type: "handles"; payload: HandleBody }
  | { type: "experiences"; payload: ExperienceBody }
  | { type: "education"; payload: EducationBody }
  | { type: "skills"; payload: SkillBody }
export type EditFormWrapperProps = {
  formType: FormType
  id: string
  setEntity: (e: EntityType) => void
  onSetFresh: () => void
  onSubmit: FormEventHandler<HTMLFormElement>
  children?: React.ReactNode
}
export default function EditFormWrapper({
  formType,
  onSubmit,
  onSetFresh,
  setEntity,
  id,
  children,
}: EditFormWrapperProps) {
  const { edit, toggleEdit } = useEdit()
  const isHandleUpdate =
    formType.type === "handles" && formType.body.find((s) => s._id === id)
  const isExpUpdate =
    formType.type === "experiences" && formType.body.find((s) => s._id === id)
  const onDelete = () => {
    formType.remove(id)
    toggleEdit(false)
  }
  const onHandleClick = (handle: HandleBody) => {
    setEntity({ type: "handles", payload: handle })
    toggleEdit(true)
  }
  const onExpClick = (exp: ExperienceBody) => {
    setEntity({ type: "experiences", payload: exp })
  }
  const onEducationClick = (education: EducationBody) => {
    setEntity({ type: "education", payload: education })
  }
  const onAddNew = () => {
    onSetFresh()
    toggleEdit(true)
  }
  return (
    <div className="profile__form">
      <div className="profile__formHead">
        <CommonHeading text={formType.type} />
        <GrAddCircle className="cursor__pointer" size={30} onClick={onAddNew} />
      </div>
      <ul className="common__profileList">
        {formType.type === "handles" ? (
          formType.body.map((listItem) => (
            <div key={listItem._id} className="cursor__pointer">
              <Handle
                onClick={() => onHandleClick(listItem)}
                username={listItem.username}
                link={listItem.link}
                platform={listItem.platform}
              />
            </div>
          ))
        ) : formType.type === "experiences" ? (
          formType.body.map((listItem) => (
            <div key={listItem._id} className="cursor__pointer">
              <Experience
                onClick={() => onExpClick(listItem)}
                company={listItem.company}
                description={listItem.description}
                title={listItem.title}
              />
            </div>
          ))
        ) : formType.type === "educations" ? (
          formType.body.map((listItem) => (
            <div key={listItem._id} className="cursor__pointer">
              <Education
                onClick={() => onEducationClick(listItem)}
                degree={listItem.degree}
                area={listItem.area}
                school={listItem.school}
                description={listItem.description}
              />
            </div>
          ))
        ) : formType.type === "skills" ? (
          <div className="cursor__pointer"></div>
        ) : null}
      </ul>
      {edit ? (
        <form onSubmit={onSubmit} className="profile__mainForm">
          {children}
          <div className="profile__btns d-flex-center">
            <button className="primary__btn" type="submit">
              {isHandleUpdate || isExpUpdate ? "Update" : "Add"}
            </button>
            {isHandleUpdate || isExpUpdate ? (
              <button onClick={onDelete} type="button" className="btn">
                Delete
              </button>
            ) : null}
          </div>
        </form>
      ) : null}
    </div>
  )
}
