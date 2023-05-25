import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import ProfileLeft from "./ProfileLeft"
import "./ProfilePage.css"
import ProfileRight from "./ProfileRight"
import { loadProfileAction } from "./profileSlice"
import FullLoading from "../common/FullLoading"
import useProfile from "./useProfile"
export default function ProfilePage() {
  const { loading, profile } = useProfile()
  const postTags = ["Java", "C++", "Hammmer"]
  return (
    <main className="profile__page">
      {loading ? (
        <FullLoading />
      ) : (
        <div className="profile__wrapper">
          <ProfileLeft
            user={profile?.user}
            status={profile?.status || "Here is using your website"}
            postTags={postTags}
          />
          {profile ? <ProfileRight profile={profile} /> : null}
        </div>
      )}
    </main>
  )
}
