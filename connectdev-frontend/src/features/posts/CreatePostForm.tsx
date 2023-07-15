import { IoCloseOutline } from "react-icons/io5"
import { SlTag } from "react-icons/sl"
import { BarLoader } from "react-spinners"
import { useAppSelector } from "../../app/hooks"
import Button from "../common/Button"
import IUser from "../login/interfaces"
import { UserAvatarSmall } from "./CreatePost"
import "./CreatePostForm.css"
import useNewPost from "./useNewPost"
type CreatePostFormProps = {
  user: IUser | null
}

export default function CreatePostForm({ user }: CreatePostFormProps) {
  const {
    onChangeInput,
    state,
    onAddTag,
    onChangeText,
    onSubmit,
    onRemoveTag,
  } = useNewPost()
  const { newPostStatus } = useAppSelector((state) => state.post)
  const newPostLoading = newPostStatus === "loading"
  return (
    <>
      <form onSubmit={onSubmit} className="create__postForm">
        <div className="create__postUser d-flex-center">
          <UserAvatarSmall avatar={user?.avatar} name={user ? user.name : ""} />
          <p>Create a new post</p>
        </div>
        <input
          className="create__same"
          type="text"
          disabled={newPostLoading}
          name="title"
          value={state.title}
          placeholder="Title*"
          onChange={onChangeInput}
        />
        <div className="create__errTxt">{state.titleErrTxt}</div>
        <textarea
          onChange={onChangeText}
          name="text"
          disabled={newPostLoading}
          value={state.text}
          className="create__same"
          placeholder="Text*"
        />
        <div className="create__errTxt">{state.textErrTxt}</div>
        <div className="create__same create__postTag">
          {state.tags.length > 0 ? (
            <div className="tags__list ">
              {state.tags.map((tag) => (
                <span key={tag.id}>
                  {tag.tag}{" "}
                  <IoCloseOutline onClick={() => onRemoveTag(tag.id)} />
                </span>
              ))}
            </div>
          ) : null}
          <input
            disabled={newPostLoading}
            onChange={onChangeInput}
            type="text"
            value={state.tag}
            placeholder="Tag"
            name="tag"
          />

          <button
            type="button"
            onClick={onAddTag}
            className="btn d-flex-center"
          >
            <SlTag /> <span>Add tag</span>
          </button>
        </div>
        <div className="create__errTxt">{state.tagErrTxt}</div>

        {newPostLoading ? (
          <div className="d-flex-center">
            <BarLoader color="var(--secondary-color)" width={200} />
          </div>
        ) : (
          <div className="create__btn d-flex-center">
            <Button label="Post" />
          </div>
        )}
      </form>
    </>
  )
}
