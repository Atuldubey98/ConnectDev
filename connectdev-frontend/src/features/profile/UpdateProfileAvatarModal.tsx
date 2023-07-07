import { ChangeEventHandler, useState } from "react"
import Modal from "react-modal"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { UserAvatarSmall } from "../posts/CreatePost"
import { IUserDetails } from "../posts/interfaces"
import "./UpdateProfileAvatarModal.css"
import {
  updateProfileAvatarAction,
  uploadProfileAvatarAction,
} from "./profileSlice"
import { CircleLoader } from "react-spinners"
export type UpdateProfileAvatarModalProps = {
  modalIsOpen: boolean
  user: IUserDetails | null
  closeProfileModal: VoidFunction
}
export default function UpdateProfileAvatarModal(
  props: UpdateProfileAvatarModalProps,
) {
  const { modalIsOpen, closeProfileModal, user } = props
  const appDispatch = useAppDispatch()
  const loading =
    useAppSelector((state) => state.profile.profileAvatarStatus) === "loading"
  const avatarHasToBeUpdated = (user?.avatar || "").length > 0
  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.currentTarget.files && e.currentTarget.files.length === 1) {
      if (avatarHasToBeUpdated) {
        appDispatch(updateProfileAvatarAction(e.currentTarget.files[0]))
      } else {
        appDispatch(uploadProfileAvatarAction(e.currentTarget.files[0]))
      }
    }
  }
  
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      maxWidth: "450px",
      width: "100%",
      transform: "translate(-50%, -50%)",
    },
  }
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeProfileModal}
      style={customStyles}
      contentLabel="Profile Avatar UpdateModal"
    >
      <div className="d-flex-center">
        {loading ? (
          <CircleLoader color="#36d7b7" />
        ) : (
          <UserAvatarSmall
            size={100}
            avatar={user?.avatar}
            name={user?.name || ""}
          />
        )}
      </div>
      <ul className="avatar__btns">
        <li className="avatar__file">
          <span>Upload Avatar</span>
          <input
            type="file"
            name="avatar"
            accept=".jpg, .jpeg, .png"
            onChange={onChange}
          />
        </li>
        <li>Remove profile picture</li>
        <li
          onClick={closeProfileModal}
          style={{
            color: "var(--danger-color)",
          }}
        >
          Close
        </li>
      </ul>
    </Modal>
  )
}
