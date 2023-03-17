import {
  ACTIVE_USERS_ERROR,
  ACTIVE_USERS_LOADING,
  ACTIVE_USERS_RESET,
  ACTIVE_USERS_SUCCESS,
  CHAT_USERS_ERROR,
  CHAT_USERS_LOADING,
  CHAT_USERS_RESET,
  CHAT_USERS_SUCCESS,
  CREATE_CHATID_SUCCESS,
  RESET_ACTIVE_ROOM_ID,
  SET_ACTIVE_ROOM_ID,
} from "../constants/chatUserConstants";
const initialState = {
  users: { data: [], loading: false, error: "" },
  activeUsers: { data: [], loading: false, error: "" },
  activeRoom: "",
};
export const chatUserReducer = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case SET_ACTIVE_ROOM_ID:
      return {
        ...state,
        activeRoom: payload,
      };
    case RESET_ACTIVE_ROOM_ID:
      return {
        ...state,
        activeRoom: "",
      };
    case CHAT_USERS_RESET:
      return {
        ...initialState,
      };
    case CHAT_USERS_LOADING:
      return {
        ...state,
        users: { ...state.users, loading: true, error: "" },
      };
    case CHAT_USERS_SUCCESS:
      return {
        ...state,
        users: {
          ...state.users,
          data: [...state.users.data, ...payload],
          loading: false,
          error: "",
        },
      };
    case CHAT_USERS_ERROR:
      return {
        ...state,
        users: { ...state.users, error: payload, loading: false },
      };

    case ACTIVE_USERS_RESET:
      return {
        ...initialState,
      };
    case ACTIVE_USERS_LOADING:
      return {
        ...state,
        activeUsers: { ...state.activeUsers, loading: true, error: "" },
      };
    case ACTIVE_USERS_SUCCESS:
      return {
        ...state,
        activeUsers: {
          ...state.activeUsers,
          data: payload,
          loading: false,
          error: "",
        },
      };
    case ACTIVE_USERS_ERROR:
      return {
        ...state,
        activeUsers: { ...state.activeUsers, error: payload, loading: false },
      };

    case CREATE_CHATID_SUCCESS:
      return {
        ...state,
        users: {
          ...state.users,
          data: state.users.data.map((user) => {
            if (user._id === payload) {
              return { ...user, isContact: true };
            }
            return user;
          }),
        },
      };

    default:
      return state;
  }
};
