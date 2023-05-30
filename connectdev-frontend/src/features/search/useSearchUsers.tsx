import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { IUserDetails } from "../posts/interfaces"
import { searchUserAction, setSearchUsersIdle } from "./searchSlice"

export default function useSearchUsers(search: string) {
  const { usersSearchResponse, usersStatus } = useAppSelector(
    (state) => state.search,
  )
  const [page, setPage] = useState<number>(1)
  function onPageIncrement() {
    setPage((p) => p + 1)
  }
  const appDispatch = useAppDispatch()
  const loading = usersStatus === "loading"
  const showMoreBtn: boolean =
    usersSearchResponse !== null && usersSearchResponse?.hasNextPage
  const users: IUserDetails[] =
    (usersSearchResponse && usersSearchResponse.users) || []
  useEffect(() => {
    appDispatch(searchUserAction(search, page))
  }, [page])
  useEffect(() => {
    appDispatch(setSearchUsersIdle())
  }, [])
  return { users, page, loading, showMoreBtn, onPageIncrement }
}
