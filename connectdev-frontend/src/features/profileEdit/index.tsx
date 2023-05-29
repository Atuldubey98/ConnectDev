import { AiOutlineInfoCircle } from "react-icons/ai"
import "./ProfileEdit.css"
import ProfileEducationForm from "./ProfileEducationForm"
import ProfileExpForm from "./ProfileExpForm"
import ProfileHandlesForm from "./ProfileHandlesForm"
import ProfileSkillsForm from "./ProfileSkillsForm"
import ProfileStatusForm from "./ProfileStatusForm"
import useProfileEdit from "./useProfileEdit"
import { Link } from "react-router-dom"
import Button from "../common/Button"
import { useAppSelector } from "../../app/hooks"
import MessageInfo from "../common/MessageInfo"
export default function ProfileEdit() {
  const { updateError } = useAppSelector((state) => state.profile)
  const {
    state,
    onChangeStatus,
    addSkillDispatch,
    removeSkillDispatch,
    onSubmitProfile,
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
        <div className="profile__editHead">
          <h1>Edit your profile</h1>
          <i>
            Dont forget to click on Submit after completing the form{" "}
            <Link to={"#submit__profile"}>
              <AiOutlineInfoCircle size={15} />
            </Link>
          </i>
        </div>
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
          handleErrTxt={state.handleErrTxt}
        />
        <ProfileExpForm
          formType={{
            type: "experiences",
            body: state.experience,
            add: addExperienceDispatch,
            remove: removeexperienceDispatch,
            update: updateExperienceDispatch,
          }}
          experienceErrTxt={state.experienceErrTxt}
        />
        <ProfileEducationForm
          formType={{
            type: "educations",
            body: state.education,
            add: addEducationDispatch,
            remove: removeEducationDispatch,
            update: updateEducationDispatch,
          }}
          educationErrTxt={state.educationErrTxt}
        />
        {updateError ? (
          <MessageInfo isError={true} message={updateError} />
        ) : null}
        <div className="d-flex-center">
          <Button label="Submit" onClick={onSubmitProfile} />
        </div>
      </div>
    </main>
  )
}
