import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import registerReducer from "../features/register/registerSlice"
import loginReducer from "../features/login/loginSlice"
export const store = configureStore({
  reducer: {
    register: registerReducer,
    login: loginReducer,
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
