import "./ProfileEdit.css"
import ProfileSkillsForm from "./ProfileSkillsForm"
import ProfileStatusForm from "./ProfileStatusForm"
import useProfileEdit from "./useProfileEdit"
import EditFormWrapper from "./EditFormWrapper"
import ProfileHandlesForm from "./ProfileHandlesForm"
import ProfileExperience from "../profile/ProfileExperience"
import ProfileExpForm from "./ProfileExpForm"
export default function ProfileEdit() {
  const {
    state,
    onChangeStatus,
    addSkillDispatch,
    removeSkillDispatch,
    updateSkillDispatch,
    addExperienceDispatch,
    removeexperienceDispatch,
    updateExperienceDispatch,
    removeEducationDispatch,
    addHandleDispatch,
    removeHandleDispatch,
    updateHandleDispatch,
    updateEducationDispatch,
    addEducationDispatch,
  } = useProfileEdit()
  return (
    <main className="profile__edit">
      <div className="profile__editWrapper">
        <ProfileStatusForm
          onChangeStatus={onChangeStatus}
          status={state.status}
          statusErrTxt={state.statusErrTxt}
        />
        <ProfileSkillsForm
          updateSkillDispatch={updateSkillDispatch}
          removeSkillDispatch={removeSkillDispatch}
          addSkillDispatch={addSkillDispatch}
          skills={state.skills}
          skillErrTxt={state.skillErrTxt}
        />
        <ProfileHandlesForm
          formType={{
            type: "handles",
            body: state.handle,
            add: addHandleDispatch,
            remove: removeHandleDispatch,
            update: updateHandleDispatch,
          }}
        />
        <ProfileExpForm
          formType={{
            type: "experiences",
            body: state.experience,
            add: addExperienceDispatch,
            remove: removeexperienceDispatch,
            update: updateExperienceDispatch,
          }}
        />
      </div>
    </main>
  )
}
