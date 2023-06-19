import { AiFillEdit } from "react-icons/ai"
import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import FullLoading from "../common/FullLoading"
import LinkButton from "../common/LinkButton"
import {
  setUpdateProfilePictureModalClose,
  setUpdateProfilePictureModalOpen,
} from "../ui/uiSlice"
import FriendRequestWrapper from "./FriendRequestWrapper"
import ProfileLeft from "./ProfileLeft"
import "./ProfilePage.css"
import ProfileRight from "./ProfileRight"
import TotalPosts from "./TotalPosts"
import UpdateProfileAvatarModal from "./UpdateProfileAvatarModal"
import useProfile from "./useProfile"
export default function ProfilePage() {
  const { userId } = useParams()
  const { user } = useAppSelector((state) => state.login)
  const { updateProfilePictureModal } = useAppSelector((state) => state.ui)
  const appDispatch = useAppDispatch()
  const closeProfileModal = () => {
    appDispatch(setUpdateProfilePictureModalClose())
  }
  const { loading, profile, totalPostByUser, friendRequest } =
    useProfile(userId)
  const isCurrentUserSameForProfile = user?._id === profile?.user._id
  const onAvatarClick = () => {
    if (!isCurrentUserSameForProfile) {
      return
    }
    appDispatch(setUpdateProfilePictureModalOpen())
  }
  return (
    <main className="profile__page">
      {loading ? (
        <FullLoading />
      ) : (
        <div className="profile__wrapper">
          <ProfileLeft
            onAvatarClick={onAvatarClick}
            isCurrentUserSameForProfile={isCurrentUserSameForProfile}
            user={profile?.user || null}
            status={profile?.status || "Here is using your website"}
          >
            {(userId && userId === user?._id) || !userId ? (
              <div className="d-flex-center">
                <LinkButton to="/profile/edit" label="Edit Profile">
                  <AiFillEdit size={20} />
                </LinkButton>
              </div>
            ) : null}
            <TotalPosts
              total={totalPostByUser}
              userId={userId || user?._id || ""}
            />
          </ProfileLeft>
          {!profile || isCurrentUserSameForProfile ? null : (
            <FriendRequestWrapper
              friendUserId={userId || ""}
              friendRequest={friendRequest}
            />
          )}
          <ProfileRight profile={profile} />
        </div>
      )}
      <UpdateProfileAvatarModal
        user={profile?.user || null}
        modalIsOpen={updateProfilePictureModal}
        closeProfileModal={closeProfileModal}
      />
    </main>
  )
}
