import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { IProfile } from "./interfaces"
import { AppThunk } from "../../app/store"
import { loadProfile, updateProfile } from "./profileAPI"
import { UpdateProfileBody } from "../profileEdit/interfaces"
import { isAxiosError } from "axios"

type State = {
  profileStatus: "loading" | "success" | "failure" | "idle"
  profile: IProfile | null
  updateStatus: "loading" | "success" | "failure" | "idle"
  updateError: string
}
const initialState: State = {
  profileStatus: "idle",
  profile: null,
  updateStatus: "idle",
  updateError: "",
}
const profileSlice = createSlice({
  initialState,
  name: "profile",
  reducers: {
    setUpdateLoading: (state) => {
      state.updateStatus = "loading"
      state.updateError = ""
    },
    setUpdateError: (state, action: PayloadAction<string>) => {
      state.updateError = action.payload
      state.profileStatus = "failure"
    },
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

export const {
  setProfileError,
  setProfileLoading,
  setProfileSuccess,
  setUpdateError,
} = profileSlice.actions

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
export const updateProfileAction =
  (
    profile: UpdateProfileBody,
    navigateToProfile: VoidFunction,
    showToast: VoidFunction,
  ): AppThunk =>
  async (dispatch) => {
    try {
      await updateProfile(profile)
      showToast()
      navigateToProfile()
    } catch (error) {
      dispatch(
        setUpdateError(
          isAxiosError(error)
            ? error.response?.data.message
            : "Error Occured !",
        ),
      )
    }
  }
export default profileSlice.reducer