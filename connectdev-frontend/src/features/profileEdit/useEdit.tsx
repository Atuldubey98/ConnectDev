import React, { useState } from "react"

export default function useEdit() {
  const [edit, setEdit] = useState<boolean>(false)

  function toggleEdit(e:boolean) {
    setEdit(e);
  }
  return {
    toggleEdit,
    edit,
  }
}
