import {
  CLEAR_ERRORS,
  LOAD_USER_FAIL,
  LOAD_USER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  PROFILE_PIC_LOADED,
  PROFILE_PIC_ERROR,
  PROFILE_PIC_LOADING,
} from "../constants/userConstants";

export const userReducer = (
  state = {
    loading: true,
    isAuthenticated: false,
    user: null,
    registerError: "",
    profilePicLoading: false,
    profilePicError: "",
  },
  action
) => {
  switch (action.type) {
    case PROFILE_PIC_LOADED:
      return {
        ...state,
        user: {
          ...state.user,
          avatar: action.payload.avatar,
          name: action.payload.name,
        },
        profilePicLoading: false,
      };
    case PROFILE_PIC_ERROR:
      return {
        ...state,
        profilePicError: action.payload,
        profilePicLoading: false,
      };
    case PROFILE_PIC_LOADING:
      return {
        ...state,
        profilePicError: "",
        profilePicLoading: true,
      };
    case LOGIN_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      };
    case LOGIN_SUCCESS:
      return {
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case LOGOUT_SUCCESS:
      return {
        loading: false,
        user: null,
        isAuthenticated: false,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case LOAD_USER_FAIL:
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        registerError: action.payload,
        loading: false,
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        registerError: "",
      };
    default:
      return state;
  }
};
