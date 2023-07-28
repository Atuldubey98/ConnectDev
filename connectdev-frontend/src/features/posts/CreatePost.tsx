import { memo } from "react"
import { RxAvatar } from "react-icons/rx"
import "./CreatePost.css"
import CreatePostForm from "./CreatePostForm"
function CreatePost() {

  return (
    <section className="create__post">
      <CreatePostForm />
    </section>
  )
}
export default memo(CreatePost);
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
    <img src={avatar} alt={name} height={size || 48} width={size || 48} loading="lazy" />
  ) : (
    <RxAvatar size={size || 48} />
  )
}
