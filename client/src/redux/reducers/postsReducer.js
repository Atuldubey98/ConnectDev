import {
  DELETE_REQUEST_ERROR,
  DELETE_REQUEST_LOADING,
  DELETE_REQUEST_RESET,
  DELETE_REQUEST_SUCCESS,
  POST_ERROR,
  POST_LOADING,
  POST_METADATA_SET,
  POST_REQUEST_ERROR,
  POST_REQUEST_LOADING,
  POST_REQUEST_RESET,
  POST_REQUEST_SUCCESS,
  POST_SUCCESS,
} from "../constants/postsConstants";

export const postsReducer = (
  state = { posts: { loading: false, error: null, posts: [], metadata: null } },
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
    case POST_METADATA_SET:
      return {
        ...state,
        loading: false,
        error: null,
        metadata: action.payload,
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

export const itemPostingReducer = (
  state = { loading: false, error: null, item: null },
  action
) => {
  switch (action.type) {
    case POST_REQUEST_LOADING: {
      return {
        loading: true,
        item: null,
        error: null,
      };
    }
    case POST_REQUEST_SUCCESS: {
      return {
        loading: false,
        item: action.payload,
        error: null,
      };
    }
    case POST_REQUEST_ERROR: {
      return {
        loading: false,
        item: null,
        error: action.payload,
      };
    }
    case POST_REQUEST_RESET: {
      return {
        loading: false,
        item: null,
        error: null,
      };
    }
    default:
      return { ...state };
  }
};

export const itemDeleteReducer = (
  state = { loading: false, error: null, item: null },
  action
) => {
  switch (action.type) {
    case DELETE_REQUEST_LOADING: {
      return {
        loading: true,
        item: null,
        error: null,
      };
    }
    case DELETE_REQUEST_SUCCESS: {
      return {
        loading: false,
        item: action.payload,
        error: null,
      };
    }
    case DELETE_REQUEST_ERROR: {
      return {
        loading: false,
        item: null,
        error: action.payload,
      };
    }
    case DELETE_REQUEST_RESET: {
      return {
        loading: false,
        item: null,
        error: null,
      };
    }
    default:
      return { ...state };
  }
};
