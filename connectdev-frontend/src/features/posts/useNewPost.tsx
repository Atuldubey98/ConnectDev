import { ChangeEventHandler, useReducer } from "react"
import { ICreatePostForm } from "./interfaces"
import { useAppDispatch } from "../../app/hooks"
import { createPostAction } from "./postSlice"
import { toast } from "react-toastify"
import { setPostWasJustAddedAction } from "../ui/uiSlice"

export default function useNewPost() {
  const appDispatch = useAppDispatch()
  function showToast(message: string, isError: boolean) {
    if (isError) {
      toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    } else {
      toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    }
  }
  const defaultState: ICreatePostForm = {
    title: "",
    titleErrTxt: "",
    text: "",
    textErrTxt: "",
    tag: "",
    tagErrTxt: "",
    tags: [],
  }
  type Action =
    | {
        type: "change"
        text: {
          value: string
          name: string
        }
      }
    | {
        type: "validate"
      }
    | {
        type: "addtag"
        tag: string
      }
    | {
        type: "removetag"
        id: string
      }
    | {
        type: "default"
      }

  function reducer(state: ICreatePostForm, action: Action): ICreatePostForm {
    switch (action.type) {
      case "change":
        return { ...state, [action.text.name]: action.text.value }

      case "validate":
        return {
          ...state,
          tagErrTxt: state.tag.length === 0 ? "Tag cannot be left blank" : "",
          textErrTxt:
            state.text.length === 0 ? "Text cannot be left blank" : "",
          titleErrTxt:
            state.title.length === 0 ? "Title cannot be left blank" : "",
        }
      case "addtag":
        return {
          ...state,
          tag: "",
          tags: [
            ...state.tags,
            {
              tag: action.tag,
              id: action.tag + Math.random() * state.tags.length * 10,
            },
          ],
        }
      case "removetag":
        return {
          ...state,
          tags: state.tags.filter((tag) => tag.id !== action.id),
        }
      case "default":
        return {
          ...defaultState,
        }
      default:
        return state
    }
  }
  const [state, dispatch] = useReducer(reducer, defaultState)

  const onChangeInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target
    dispatch({ type: "change", text: { name, value } })
  }
  function showAnimationOnNewPost(postId: string) {
    appDispatch(setPostWasJustAddedAction(postId))
  }
  const onChangeText: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    const { name, value } = e.target
    dispatch({ type: "change", text: { name, value } })
  }
  const onAddTag = () => {
    dispatch({ type: "addtag", tag: state.tag })
  }
  const onRemoveTag = (id: string) => {
    dispatch({ type: "removetag", id })
  }
  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    if (state.text.length === 0 || state.title.length === 0) {
      dispatch({ type: "validate" })
      return
    }
    const { tags, title, text } = state
    appDispatch(
      createPostAction(
        { tags, title, text },
        showToast,
        showAnimationOnNewPost,
      ),
    )
    dispatch({ type: "default" })
  }
  return { onChangeInput, state, onAddTag, onChangeText, onSubmit, onRemoveTag }
}
