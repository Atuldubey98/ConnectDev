import instance from "../../instance";
import {
  RANDOM_USER_ERROR,
  RANDOM_USER_LOADED,
  RANDOM_USER_LOADING,
} from "../constants/randomUserConstants";

export const getRandomProfile = (_id, showError) => async (dispatch) => {
  try {
    dispatch({ type: RANDOM_USER_LOADING });
    const { data } = await instance.get(`api/profile/random-user/${_id}`, {
      withCredentials: true,
    });
    dispatch({ type: RANDOM_USER_LOADED, payload: data });
  } catch (error) {
    dispatch({
      type: RANDOM_USER_ERROR,
      payload: error.response?.data?.message,
    });
    showError(error.response?.data?.message || "Profile not found !");
  }
};
