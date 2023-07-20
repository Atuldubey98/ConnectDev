import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit"
import chatsReducer from "../features/chats/chatsSlice"
import friendsReducer from "../features/friends/friendsSlice"
import loginReducer from "../features/login/loginSlice"
import notificationRedcuer from "../features/notifications/notificationSlice"
import postReducer from "../features/posts/postSlice"
import profileReducer from "../features/profile/profileSlice"
import registerReducer from "../features/register/registerSlice"
import searchReducer from "../features/search/searchSlice"
import uiReducer from "../features/ui/uiSlice"
export const store = configureStore({
  reducer: {
    register: registerReducer,
    login: loginReducer,
    post: postReducer,
    ui: uiReducer,
    profile: profileReducer,
    search: searchReducer,
    chats: chatsReducer,
    notification: notificationRedcuer,
    friends: friendsReducer,
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
