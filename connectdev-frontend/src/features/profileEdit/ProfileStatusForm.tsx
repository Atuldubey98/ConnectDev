import { ChangeEventHandler, useState } from "react"
import Input from "../common/Input"
import InputWithError from "../common/InputWithError"
import CommonHeading from "../profile/CommonHeading"
import { AiFillEdit } from "react-icons/ai"

type ProfileStatusFormProps = {
  status: string
  onChangeStatus: ChangeEventHandler<HTMLInputElement>
  statusErrTxt: string
}

export default function ProfileStatusForm({
  status,
  statusErrTxt,
  onChangeStatus,
}: ProfileStatusFormProps) {
  const [edit, setEdit] = useState<boolean>(true)
  function toggleEdit() {
    setEdit(!edit)
  }
  return (
    <div className="profile__form">
      <div className="profile__formHead">
        <CommonHeading text="Status" />
        <AiFillEdit  size={30} onClick={toggleEdit} type="button" />
      </div>
      <InputWithError
        input={
          <Input
            disabled={edit}
            value={status}
            onChange={onChangeStatus}
            name="status"
            label="Status"
          />
        }
        error={statusErrTxt}
      />
    </div>
  )
}
