import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { loadProfileAction } from "./profileSlice"

export default function useProfile() {
  const { profile, profileStatus } = useAppSelector((state) => state.profile);
  const appDispatch = useAppDispatch()

  const loading: boolean = profileStatus === "loading"
  useEffect(() => {
    appDispatch(loadProfileAction())
  }, [])
  return { loading, profile }
}
