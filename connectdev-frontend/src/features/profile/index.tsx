import { Link, useParams } from "react-router-dom"
import { useAppSelector } from "../../app/hooks"
import FullLoading from "../common/FullLoading"
import ProfileLeft from "./ProfileLeft"
import "./ProfilePage.css"
import ProfileRight from "./ProfileRight"
import useProfile from "./useProfile"
import LinkButton from "../common/LinkButton"
import { AiFillEdit } from "react-icons/ai"
export default function ProfilePage() {
  const { userId } = useParams()
  const { loading, profile } = useProfile(userId)
  const postTags = ["Java", "C++", "Hammmer"]
  const { user } = useAppSelector((state) => state.login)
  return (
    <main className="profile__page">
      {loading ? (
        <FullLoading />
      ) : (
        <div
          style={{
            gridTemplateColumns: "1fr",
          }}
          className="profile__wrapper"
        >
          <ProfileLeft
            user={profile?.user || null}
            status={profile?.status || "Here is using your website"}
            postTags={postTags}
          >
            {(userId && userId === user?._id) || !userId ? (
              <div className="d-flex-center">
                <LinkButton to="/profile/edit" label="Edit Profile">
                  <AiFillEdit size={20} />
                </LinkButton>
              </div>
            ) : null}
          </ProfileLeft>
          <ProfileRight profile={profile} />
        </div>
      )}
    </main>
  )
}
