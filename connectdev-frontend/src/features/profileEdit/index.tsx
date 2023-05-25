import "./ProfileEdit.css"
import ProfileSkillsForm from "./ProfileSkillsForm"
import ProfileStatusForm from "./ProfileStatusForm"
import useProfileEdit from "./useProfileEdit"
export default function ProfileEdit() {
  const { state, onChangeStatus, addSkillDispatch } = useProfileEdit()
  return (
    <main className="profile__edit">
      <div className="profile__editWrapper">
        <ProfileStatusForm
          onChangeStatus={onChangeStatus}
          status={state.status}
          statusErrTxt={state.statusErrTxt}
        />
        <ProfileSkillsForm
          addSkillDispatch={addSkillDispatch}
          skills={state.skills}
          skillErrTxt={state.skillErrTxt}
        />
      </div>
    </main>
  )
}
