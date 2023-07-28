import React, { useRef } from "react"
import { useNavigate } from "react-router-dom"
import useTransitionalLargeInput from "./useTransitionalLargeInput"

export default function useSearchForm() {
  const searchRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const { large } = useTransitionalLargeInput(searchRef);
  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    const search: string = searchRef.current ? searchRef.current.value : ""
    navigate(`/search/${search}`)
  }

  return { large, searchRef, onSubmit }
}
