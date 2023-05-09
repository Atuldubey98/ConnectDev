import { createSlice } from "@reduxjs/toolkit"

type State = {
  isEditModalOpen: boolean
  isCreateModalOpen: boolean
}
const initialState: State = {
  isEditModalOpen: false,
  isCreateModalOpen: false,
}
const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setEditModal: (state) => {
      state.isEditModalOpen = !state.isEditModalOpen
    },
    setCreateModal: (state) => {
      state.isCreateModalOpen = !state.isCreateModalOpen
    },
  },
})
export const { setEditModal,setCreateModal } = uiSlice.actions
export default uiSlice.reducer
