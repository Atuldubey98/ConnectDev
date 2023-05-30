import React, { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function useSearchForm() {
  const searchRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    const search: string = searchRef.current ? searchRef.current.value : ""
    navigate(`/search/${search}`)
  }
  const [large, setLarge] = useState<boolean>(false)
  function focusIn() {
    setLarge(true)
  }
  function focusOut() {
    setLarge(false)
  }
  useEffect(() => {
    if (searchRef.current) {
      searchRef.current.addEventListener("focusin", focusIn)
      searchRef.current.addEventListener("focusout", focusOut)
    }
    return () => {
      searchRef.current?.addEventListener("focus", focusOut)
      searchRef.current?.addEventListener("focusin", focusIn)
    }
  }, [])
  return { large, searchRef, onSubmit }
}
