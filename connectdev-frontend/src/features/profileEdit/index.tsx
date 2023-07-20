import { AiOutlineInfoCircle } from "react-icons/ai"
import { Link } from "react-router-dom"
import { useAppSelector } from "../../app/hooks"
import Button from "../common/Button"
import MessageInfo from "../common/MessageInfo"
import "./ProfileEdit.css"
import ProfileEducationForm from "./ProfileEducationForm"
import ProfileExpForm from "./ProfileExpForm"
import ProfileHandlesForm from "./ProfileHandlesForm"
import ProfileSkillsForm from "./ProfileSkillsForm"
import ProfileStatusForm from "./ProfileStatusForm"
import useProfileEdit from "./useProfileEdit"
import Container from "../common/Container"
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
    <Container>
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
          <div id="submit__profile" className="d-flex-center">
            <Button label="Submit" onClick={onSubmitProfile} />
          </div>
        </div>
      </main>
    </Container>
  )
}
