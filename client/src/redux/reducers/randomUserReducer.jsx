import {
  RANDOM_USER_ERROR,
  RANDOM_USER_LOADING,
  RANDOM_USER_LOADED,
} from "../constants/randomUserConstants";

export const randomUserReducer = (
  state = {
    ranProfileLoading: false,
    ranProfileError: null,
    ranProfile: {
      skills: [],
      handle: [],
      status: "",
      user : {},
      experience: [],
      education: [],
    },
  },
  action
) => {
  switch (action.type) {
    case RANDOM_USER_LOADED:
      return {
        ...state,
        ranProfileLoading: false,
        ranProfile: { ...state.ranProfile, ...action.payload },
      };
    case RANDOM_USER_LOADING:
      return {
        ...state,
        ranProfileLoading: true,
      };
    case RANDOM_USER_ERROR:
      return {
        ...state,
        ranProfileError: action.payload,
        ranProfileLoading : false,
      };
    default:
      return state;
  }
};
