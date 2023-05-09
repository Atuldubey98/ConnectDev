import Modal from "react-modal"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import "./CreateModal.css"
import { setCreateModal } from "../ui/uiSlice"
import Input from "./Input"
import { useEffect, useRef, useState } from "react"
import useAutosizeTextArea from "./useAutosizeTextArea"
import { IPost } from "../../interfaces/post"

export default function CreateModal() {
  const [post, setPost] = useState<{
    text: string
    title: string
    tags: string[]
    tag: string
  }>({
    text: "",
    title: "",
    tags: [],
    tag: "",
  })
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      width: "80%",
      maxWidth: "540px",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  }
  const { isCreateModalOpen } = useAppSelector((state) => state.ui)
  const appDispatch = useAppDispatch()
  const textRef = useRef<HTMLTextAreaElement>(null)
  useAutosizeTextArea(textRef.current, post.text)
  const onChange = (e: any) => {
    setPost({ ...post, [e.target.name]: e.target.value })
  }
  const onAddTag: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    setPost({ ...post, tags: [...post.tags, post.tag] })
    setPost({ ...post, tag: "" })
  }
  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
  }
  return (
    <Modal
      isOpen={isCreateModalOpen}
      onRequestClose={() => appDispatch(setCreateModal())}
      style={customStyles}
    >
      <form onSubmit={onSubmit} className="create__modalForm">
        <Input
          value={post.title}
          label="Title :"
          name="title"
          onChange={onChange}
        />
        <div className="input__control">
          <label htmlFor="text">Text :</label>
          <textarea
            onChange={onChange}
            name="text"
            id="text"
            rows={1}
            ref={textRef}
            value={post.text}
          />
        </div>
      </form>
      <form onSubmit={onAddTag}>
        <div className="post__tagsList d-flex-center">
          {post.tags.map((tag, index) => (
            <span key={tag + index}>{tag}</span>
          ))}
        </div>
        <input
          type="text"
          placeholder="Tag"
          value={post.tag}
          name="tag"
          onChange={onChange}
        />
      </form>
    </Modal>
  )
}
