import ProfileEducation from "./ProfileEducation"
import ProfileExperience from "./ProfileExperience"
import ProfileHandles from "./ProfileHandles"
import ProfileSkills from "./ProfileSkills"
import { IProfile } from "./interfaces"
import "./ProfileRight.css"
type ProfileRightProps = {
  profile: IProfile | null
}
export default function ProfileRight({ profile }: ProfileRightProps) {
  return profile ? (
    <section className="profile__right">
      {profile?.skills && profile.skills.length > 0 ? (
        <ProfileSkills skills={profile.skills} />
      ) : null}
      {profile?.experience && profile.experience.length > 0 ? (
        <ProfileExperience experience={profile.experience} />
      ) : null}
      {profile?.handle && profile.handle.length > 0 ? (
        <ProfileHandles handles={profile.handle} />
      ) : null}
      {profile?.education && profile.education.length > 0 ? (
        <ProfileEducation educations={profile.education} />
      ) : null}
    </section>
  ) : (
    <div className="profle__null">
      <h3>Profile does not exist</h3>
    </div>
  )
}
