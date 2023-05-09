import { RxAvatar } from "react-icons/rx"
import "./CreatePost.css"
export default function CreatePost() {
  return (
    <section className="create__post d-flex-center">
      <RxAvatar size={48} />
      <p className="create__fake">Create a new Post</p>
    </section>
  )
}
