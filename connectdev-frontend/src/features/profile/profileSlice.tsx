import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { IProfile } from "./interfaces"
import { AppThunk } from "../../app/store"
import { loadProfile } from "./profileAPI"

type State = {
  profileStatus: "loading" | "success" | "failure" | "idle"
  profile: IProfile | null
}
const initialState: State = {
  profileStatus: "idle",
  profile: null,
}
const profileSlice = createSlice({
  initialState,
  name: "profile",
  reducers: {
    setProfileLoading: (state) => {
      state.profileStatus = "loading"
    },
    setProfileSuccess: (state, action: PayloadAction<IProfile>) => {
      state.profileStatus = "success"
      state.profile = action.payload
    },
    setProfileError: (state) => {
      state.profileStatus = "failure"
      state.profile = null
    },
  },
})

export const { setProfileError, setProfileLoading, setProfileSuccess } =
  profileSlice.actions

export const loadProfileAction =
  (userId: string | undefined): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setProfileLoading())
      const { data } = await loadProfile(userId)
      dispatch(setProfileSuccess(data))
    } catch (error) {
      dispatch(setProfileError())
    }
  }
export default profileSlice.reducer
