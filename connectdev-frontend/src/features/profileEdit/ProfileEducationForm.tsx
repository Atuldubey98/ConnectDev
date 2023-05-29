import React, { ChangeEventHandler, FormEventHandler, useState } from "react"
import EditFormWrapper, { EntityType, FormType } from "./EditFormWrapper"
import Input from "../common/Input"
import { v4 as uuidv4 } from "uuid"

import { EducationBody } from "./interfaces"
import MessageInfo from "../common/MessageInfo"
export type ProfileEducationFormProps = {
  formType: FormType
  educationErrTxt: string
}
export default function ProfileEducationForm({
  formType,
  educationErrTxt,
}: ProfileEducationFormProps) {
  const defaultEducation: EducationBody = {
    _id: uuidv4(),
    area: "",
    description: "",
    degree: "",
    school: "",
  }
  const [education, setEducation] = useState<EducationBody>(defaultEducation)
  const setEntity = (e: EntityType) => {
    if (e.type === "education") {
      setEducation(e.payload)
    }
  }
  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.currentTarget
    setEducation({ ...education, [name]: value })
  }
  function onSetFresh() {
    setEntity({ type: "education", payload: defaultEducation })
  }
  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    const isEducation = formType.type === "educations"
    const isUpdate =
      isEducation && formType.body.find((s) => s._id === education._id)
    if (isEducation) {
      if (isUpdate) {
        formType.update(education)
        setEntity({ type: "education", payload: defaultEducation })
      } else {
        formType.add(education)
      }
    }
  }
  return (
    <EditFormWrapper
      onSetFresh={onSetFresh}
      setEntity={setEntity}
      id={education._id}
      formType={formType}
      onSubmit={onSubmit}
    >
      <Input
        label="Area : "
        value={education.area}
        name="area"
        onChange={onChange}
      />
      <Input
        label="Degree :"
        value={education.degree}
        name="degree"
        onChange={onChange}
      />
      <Input
        label="School or College :"
        value={education.school}
        name="school"
        onChange={onChange}
      />
      <Input
        label="Description : "
        value={education.description}
        name="description"
        onChange={onChange}
      />
      {educationErrTxt.length > 0 ? (
        <MessageInfo isError={true} message={educationErrTxt} />
      ) : null}
    </EditFormWrapper>
  )
}
