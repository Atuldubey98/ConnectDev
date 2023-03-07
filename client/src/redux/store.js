import { createStore, combineReducers, applyMiddleware } from "redux";
import { userReducer } from "./reducers/userReducer";
import { profileReducer } from "./reducers/profileReducer";

import thunk from "redux-thunk";
import {
  itemDeleteReducer,
  itemPostingReducer,
  postsReducer,
} from "./reducers/postsReducer";
import { randomUserReducer } from "./reducers/randomUserReducer";
import { chatUserReducer } from "./reducers/chatUserReducer";
import { chatReducer } from "./reducers/chatReducer";

const reducer = combineReducers({
  user: userReducer,
  posts: postsReducer,
  item: itemPostingReducer,
  itemDelete: itemDeleteReducer,
  profile: profileReducer,
  ranProfile: randomUserReducer,
  chatUser: chatUserReducer,
  chats: chatReducer,
});
const middlewares = [thunk];
const store = createStore(reducer, {}, applyMiddleware(...middlewares));
export default store;
