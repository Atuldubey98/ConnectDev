import {
  POST_ERROR,
  POST_LOADING,
  POST_SUCCESS,
} from "../constants/postsConstants";

export const postsReducer = (
  state = { posts: { loading: false, error: null, posts: [] } },
  action
) => {
  switch (action.type) {
    case POST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        posts: action.payload,
      };
    case POST_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
        posts: [],
      };
    case POST_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload,
        posts: [],
      };
    }
    default: {
      return { ...state };
    }
  }
};
