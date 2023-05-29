import { ChangeEventHandler, FormEventHandler, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import Input from "../common/Input"
import EditFormWrapper, { EntityType, FormType } from "./EditFormWrapper"
import { HandleBody } from "./interfaces"
import MessageInfo from "../common/MessageInfo"

export default function ProfileHandlesForm({
  formType,
  handleErrTxt,
}: {
  handleErrTxt: string
  formType: FormType
}) {
  const defaultHandle = {
    _id: uuidv4(),
    link: "",
    platform: "",
    username: "",
  }
  const [handle, setHandle] = useState<HandleBody>(defaultHandle)
  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.currentTarget
    setHandle({ ...handle, [name]: value })
  }
  const setEntity = (e: EntityType) => {
    if (e.type === "handles") {
      setHandle(e.payload)
    }
  }
  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    const isHandle = formType.type === "handles"
    const isUpdate = isHandle && formType.body.find((s) => s._id === handle._id)
    if (isHandle) {
      if (isUpdate) {
        formType.update(handle)
        setEntity({ type: "handles", payload: defaultHandle })
      } else {
        formType.add(handle)
      }
    }
  }
  function onSetFresh() {
    setEntity({ type: "handles", payload: defaultHandle })
  }
  return (
    <EditFormWrapper
      onSetFresh={onSetFresh}
      setEntity={setEntity}
      id={handle._id}
      formType={formType}
      onSubmit={onSubmit}
    >
      <Input
        label="Username or Email Id :"
        value={handle.username}
        name="username"
        onChange={onChange}
        required
      />
      <Input
        label="Platform :"
        value={handle.platform}
        name="platform"
        required
        onChange={onChange}
      />
      <Input
        label="Link of the handle :"
        value={handle.link}
        name="link"
        onChange={onChange}
        required
      />
      {handleErrTxt.length > 0 ? (
        <MessageInfo isError={true} message={handleErrTxt} />
      ) : null}
    </EditFormWrapper>
  )
}
