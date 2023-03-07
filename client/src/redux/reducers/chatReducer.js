import {
  CHATS_ERROR,
  CHATS_LOADING,
  CHATS_RESET,
  CHATS_SUCCESS,
  CHAT_MESSAGE_ADD,
} from "../constants/chatConstants";

const initialState = {
  messages: [],
  loading: false,
  error: true,
};
export const chatReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case CHATS_RESET:
      return { ...state, ...initialState };
    case CHATS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case CHATS_ERROR:
      return {
        ...state,
        error: payload,
      };
    case CHATS_SUCCESS:
      return {
        ...state,
        messages: payload,
        loading: false,
      };
    case CHAT_MESSAGE_ADD:
      return {
        ...state,
        messages: [...state.messages, payload],
      };
    default:
      return state;
  }
};
