import instance from "../../instance";
import {
  POST_ERROR,
  POST_LOADING,
  POST_SUCCESS,
} from "../constants/postsConstants";

export const getAllPosts = () => async (dispatch) => {
  try {
    dispatch({ type: POST_LOADING });
    const { data } = await instance.get(`api/post/all`, {
      withCredentials: true,
    });
    dispatch({ type: POST_SUCCESS, payload: data.posts });
  } catch (error) {
    dispatch({ type: POST_ERROR, payload: error.message });
  }
};
