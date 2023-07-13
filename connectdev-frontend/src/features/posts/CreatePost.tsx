import { RxAvatar } from "react-icons/rx"
import { useAppSelector } from "../../app/hooks"
import "./CreatePost.css"
import CreatePostForm from "./CreatePostForm"
export default function CreatePost() {
  const { user } = useAppSelector((state) => state.login)

  return (
    <section className="create__post">
      <CreatePostForm user={user} />
    </section>
  )
}

export function UserAvatarSmall({
  avatar,
  name,
  size,
}: {
  avatar?: string
  name: string
  size?: number
}) {
  return avatar ? (
    <img src={avatar} alt={name} width={size || 48} loading="lazy" />
  ) : (
    <RxAvatar size={size || 48} />
  )
}
