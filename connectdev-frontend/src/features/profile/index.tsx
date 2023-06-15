import { AiFillEdit } from "react-icons/ai"
import { useParams } from "react-router-dom"
import { useAppSelector } from "../../app/hooks"
import FullLoading from "../common/FullLoading"
import LinkButton from "../common/LinkButton"
import ProfileLeft from "./ProfileLeft"
import "./ProfilePage.css"
import ProfileRight from "./ProfileRight"
import useProfile from "./useProfile"
import TotalPosts from "./TotalPosts"
import FriendRequestWrapper from "./FriendRequestWrapper"
export default function ProfilePage() {
  const { userId } = useParams()
  const { user } = useAppSelector((state) => state.login)
  const { loading, profile, totalPostByUser, friendRequest } =
    useProfile(userId)
  const isCurrentUserSameForProfile = user?._id === profile?.user._id
  return (
    <main className="profile__page">
      {loading ? (
        <FullLoading />
      ) : (
        <div className="profile__wrapper">
          <ProfileLeft
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
    </main>
  )
}
