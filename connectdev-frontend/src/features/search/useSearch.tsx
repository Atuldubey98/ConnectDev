import React, { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { searchAction } from "./searchSlice"
import { useParams } from "react-router-dom"

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
