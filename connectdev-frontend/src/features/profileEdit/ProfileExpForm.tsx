import { ChangeEventHandler, FormEventHandler, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import Input from "../common/Input"

import EditFormWrapper, { EntityType, FormType } from "./EditFormWrapper"
import { ExperienceBody } from "./interfaces"

export default function ProfileExpForm({ formType }: { formType: FormType }) {
  const defaultExp: ExperienceBody = {
    _id: uuidv4(),
    company: "",
    description: "",
    title: "",
  }
  const [exp, setExp] = useState<ExperienceBody>(defaultExp)
  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.currentTarget
    setExp({ ...exp, [name]: value })
  }
  const setEntity = (e: EntityType) => {
    if (e.type === "experiences") {
      setExp(e.payload)
    }
  }
  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    const isExp = formType.type === "experiences"
    const isUpdate = isExp && formType.body.find((s) => s._id === exp._id)
    if (isExp) {
      if (isUpdate) {
        formType.update(exp)
        setEntity({ type: "experiences", payload: defaultExp })
      } else {
        formType.add(exp)
      }
    }
  }
  function onSetFresh() {
    setEntity({ type: "experiences", payload: defaultExp })
  }
  return (
    <EditFormWrapper
      onSetFresh={onSetFresh}
      setEntity={setEntity}
      id={exp._id}
      formType={formType}
      onSubmit={onSubmit}
    >
      <Input label="title" value={exp.title} name="title" onChange={onChange} />
      <Input
        label="company"
        value={exp.company}
        name="company"
        onChange={onChange}
      />
      <Input
        label="description"
        value={exp.description}
        name="link"
        onChange={onChange}
      />
    </EditFormWrapper>
  )
}
