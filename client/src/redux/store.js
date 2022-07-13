import { createStore, combineReducers, applyMiddleware } from "redux";
import { userReducer } from "./reducers/userReducer";
import thunk from "redux-thunk";
import { itemPostingReducer, postsReducer } from "./reducers/postsReducer";

const reducer = combineReducers({
  user: userReducer,
  posts: postsReducer,
  item: itemPostingReducer,
});
const middlewares = [thunk];
const store = createStore(reducer, {}, applyMiddleware(...middlewares));
export default store;
