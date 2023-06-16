import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { AppThunk } from "../../app/store"
export type ChatsStateType = {
  connected: boolean
}
const initialState: ChatsStateType = {
  connected: false,
 
}
const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    setConnectionState: (state, action: PayloadAction<boolean>) => {
      state.connected = action.payload
    },
  },
})

export const { setConnectionState } = chatsSlice.actions
export default chatsSlice.reducer
export const loadUserContactsAction = (): AppThunk => async (dispatch) => {}
