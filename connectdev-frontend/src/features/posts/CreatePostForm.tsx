import { SlTag } from "react-icons/sl"
import { BarLoader } from "react-spinners"
import { useAppSelector } from "../../app/hooks"
import Button from "../common/Button"
import "./CreatePostForm.css"
import CreatePostUser from "./CreatePostUser"
import FormPostTagsList from "./FormPostTagsList"
import NewPostTextArea from "./NewPostTextArea"
import useNewPost from "./useNewPost"

export default function CreatePostForm() {
  const {
    onChangeInput,
    state,
    onAddTag,
    onChangeText,
    onSubmit,
    onRemoveTag,
  } = useNewPost()
  const newPostStatus = useAppSelector((state) => state.post.newCommentStatus)
 
  const newPostLoading = newPostStatus === "loading"
  return (
    <>
      <form onSubmit={onSubmit} className="create__postForm">
        <CreatePostUser />
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
        <NewPostTextArea
          name="text"
          onChange={onChangeText}
          textErrTxt={state.textErrTxt}
          disabled={newPostLoading}
          value={state.text}
          className="create__same"
          placeholder="Text*" />
        <div className="create__same create__postTag">
          <FormPostTagsList tags={state.tags} onRemoveTag={onRemoveTag} />
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
            <Button disabled={newPostLoading} label="Post" />
          </div>
        )}
      </form>
    </>
  )
}