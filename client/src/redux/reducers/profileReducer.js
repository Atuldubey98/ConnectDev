import {
  PROFILE_LOADING,
  PROFILE_ERROR,
  PROFILE_SUCCESS,
} from "../constants/profileConstants";

export const profileReducer = (
  state = { loading: false, error: null, profile: {} },
  action
) => {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true,
      };
    case PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        profile: action.payload,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return{
        ...state
      }
  }
};
