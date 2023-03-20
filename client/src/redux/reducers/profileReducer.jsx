import {
  PROFILE_LOADING,
  PROFILE_ERROR,
  PROFILE_SUCCESS,
  SKILL_ADD,
  SKILL_REMOVE,
  EXP_ADD,
  EXP_REMOVE,
  EDUCATION_ADD,
  EDUCATION_REMOVE,
  HANDLE_ADD,
  HANDLE_REMOVE,
  STATUS_CHANGE,
} from "../constants/profileConstants";

export const profileReducer = (
  state = {
    loading: false,
    error: null,
    profile: {
      skills: [],
      handle: [],
      status: "",
      experience: [],
      education: [],
    },
  },
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
    case SKILL_ADD:
      return {
        ...state,
        profile: {
          ...state.profile,
          skills: [...state.profile.skills, action.payload],
        },
      };
    case SKILL_REMOVE:
      return {
        ...state,
        profile: {
          ...state.profile,
          skills: state.profile.skills.filter(
            (skill) => skill.id !== action.payload
          ),
        },
      };
    case EXP_ADD:
      return {
        ...state,
        profile: {
          ...state.profile,
          experience: [...state.profile.experience, action.payload],
        },
      };
    case EXP_REMOVE:
      return {
        ...state,
        profile: {
          ...state.profile,
          experience: state.profile.experience.filter(
            (exp) => exp.id !== action.payload
          ),
        },
      };
    case EDUCATION_ADD:
      return {
        ...state,
        profile: {
          ...state.profile,
          education: [...state.profile.education, action.payload],
        },
      };
    case EDUCATION_REMOVE:
      return {
        ...state,
        profile: {
          ...state.profile,
          education: state.profile.education.filter(
            (edu) => edu.id !== action.payload
          ),
        },
      };
    case HANDLE_ADD:
      return {
        ...state,
        profile: {
          ...state.profile,
          handle: [...state.profile.handle, action.payload],
        },
      };
    case HANDLE_REMOVE:
      return {
        ...state,
        profile: {
          ...state.profile,
          handle: state.profile.handle.filter(
            (han) => han.id !== action.payload
          ),
        },
      };
    case STATUS_CHANGE:
      return {
        ...state,
        profile: {
          ...state.profile,
          status: action.payload,
        },
      };
    default:
      return state;
  }
};
