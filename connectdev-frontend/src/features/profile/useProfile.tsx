import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  getCountOfPostsByUserIdAction,
  loadProfileAction,
} from "./profileSlice"

export default function useProfile(userId: string | undefined) {
  const { profile, profileStatus, totalPostByUser } = useAppSelector(
    (state) => state.profile,
  )
  const { user : userLoggedIn } = useAppSelector((state) => state.login)
  const appDispatch = useAppDispatch()
  const user = userId || userLoggedIn?._id || ""
  const loading: boolean = profileStatus === "loading"
  useEffect(() => {
    appDispatch(loadProfileAction(userId))
    appDispatch(getCountOfPostsByUserIdAction(user))
  }, [userId])
  return { loading, profile, totalPostByUser }
}
