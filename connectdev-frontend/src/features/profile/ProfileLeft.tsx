import IUser from "../login/interfaces"
import { UserAvatarSmall } from "../posts/CreatePost"
import PostTags from "../posts/PostTags"
import "./ProfileLeft.css"
type ProfileLeftProps = {
  status: string
  postTags: string[]
  user: IUser | null
  children?: React.ReactNode
}
export default function ProfileLeft({
  status,
  postTags,
  user,
  children,
}: ProfileLeftProps) {
  return (
    <section className="profile__left">
      <UserAvatarSmall
        size={200}
        avatar={user?.avatar}
        name={user?.name || ""}
      />
      <h2>{user?.name}</h2>
      <p className="profile__email">{user?.email}</p>
      <p className="profile__status">{status}</p>
      <PostTags tags={postTags} />
      {children}
    </section>
  )
}
