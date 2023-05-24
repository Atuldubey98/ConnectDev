import { RxAvatar } from "react-icons/rx"
import "./CreatePost.css"
import { useState } from "react"
import CreatePostForm from "./CreatePostForm"
import { useAppSelector } from "../../app/hooks"
export default function CreatePost() {
  const [open, setOpen] = useState<boolean>(false)
  const { user } = useAppSelector((state) => state.login)
  function toggleOpen() {
    setOpen(!open)
  }
  return (
    <section className="create__post d-flex-center">
      {open ? (
        <CreatePostForm user={user} toggleOpen={toggleOpen} />
      ) : (
        <>
          <UserAvatarSmall name={user?.name || ""} avatar={user?.avatar} />
          <p onClick={toggleOpen} className="create__fake">
            Create a new Post
          </p>
        </>
      )}
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
    <img src={avatar} alt={name} width={size || 48} />
  ) : (
    <RxAvatar size={size || 48} />
  )
}
