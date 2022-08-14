import {
  PROFILE_LOADING,
  PROFILE_ERROR,
  PROFILE_SUCCESS,
} from "../constants/profileConstants";
import instance from "../../instance";

export const getProfile = (limit, page, s, myPosts) => async (dispatch) => {
  try {
    dispatch({ type: PROFILE_LOADING });

    const { data } = await instance.get(`api/profile`, {
      withCredentials: true,
    });
    dispatch({ type: PROFILE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PROFILE_ERROR, payload: error.message });
  }
};
