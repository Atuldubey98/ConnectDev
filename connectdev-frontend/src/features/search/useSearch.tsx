import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { searchAction } from "./searchSlice"

export default function useSearch() {
  const { postsResponse, usersResponse, postsStatus, usersStatus } =
    useAppSelector((state) => state.search)
  const postsLoading = postsStatus === "loading"
  const usersLoading = usersStatus === "loading"
  const appDispatch = useAppDispatch()
  const { search: searchParams } = useParams()
  const search: string = searchParams || ""
  useEffect(() => {
    appDispatch(searchAction(search))
  }, [search])
  return { search, postsResponse, usersResponse, usersLoading, postsLoading }
}
