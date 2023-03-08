import {
  CHATS_ERROR,
  CHATS_LOADING,
  CHATS_RESET,
  CHATS_SUCCESS,
  CHAT_MESSAGE_ADD,
} from "../constants/chatConstants";

const initialState = {
  roomId: "",
  messages: [],
  loading: false,
  error: "",
};
export const chatReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case CHATS_RESET:
      return { ...state, messages: [], loading: false, error: "" };
    case CHATS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case CHATS_ERROR:
      return {
        ...state,
        error: payload,
        roomId: "",
      };
    case CHATS_SUCCESS:
      return {
        ...state,
        roomId: payload.roomId,
        messages: payload.messages,
        loading: false,
      };
    case CHAT_MESSAGE_ADD:
      return {
        ...state,
        roomId: payload.roomId,
        messages: [...state.messages, payload],
      };
    default:
      return state;
  }
};
