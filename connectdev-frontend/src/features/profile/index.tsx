import { Link } from "react-router-dom"
import { useAppSelector } from "../../app/hooks"
import FullLoading from "../common/FullLoading"
import ProfileLeft from "./ProfileLeft"
import "./ProfilePage.css"
import ProfileRight from "./ProfileRight"
import useProfile from "./useProfile"
import LinkButton from "../common/LinkButton"
import { AiFillEdit } from "react-icons/ai"
export default function ProfilePage() {
  const { loading, profile } = useProfile()
  const { user } = useAppSelector((state) => state.login)
  const postTags = ["Java", "C++", "Hammmer"]
  return (
    <main className="profile__page">
      {loading ? (
        <FullLoading />
      ) : (
        <div
          style={{
            gridTemplateColumns: profile ? "1fr 1fr" : "1fr",
          }}
          className="profile__wrapper"
        >
          <ProfileLeft
            user={user}
            status={profile?.status || "Here is using your website"}
            postTags={postTags}
          >
            <div className="d-flex-center">
              <LinkButton to="/profile/edit" label="Edit Profile">
                <AiFillEdit size={20} />
              </LinkButton>
            </div>
          </ProfileLeft>
          {profile ? <ProfileRight profile={profile} /> : null}
        </div>
      )}
    </main>
  )
}
