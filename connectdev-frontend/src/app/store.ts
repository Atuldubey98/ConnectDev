import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import registerReducer from "../features/register/registerSlice"
import loginReducer from "../features/login/loginSlice"
import postReducer from "../features/posts/postSlice"
import uiReducer from "../features/ui/uiSlice"
import profileReducer from "../features/profile/profileSlice"
import searchReducer from "../features/search/searchSlice"

export const store = configureStore({
  reducer: {
    register: registerReducer,
    login: loginReducer,
    post: postReducer,
    ui: uiReducer,
    profile: profileReducer,
    search: searchReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
