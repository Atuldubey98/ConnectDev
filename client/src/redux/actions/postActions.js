import instance from "../../instance";
import {
  POST_ERROR,
  POST_LOADING,
  POST_METADATA_SET,
  POST_SUCCESS,
} from "../constants/postsConstants";

export const getAllPosts = (limit, page) => async (dispatch) => {
  try {
    dispatch({ type: POST_LOADING });
    const { data } = await instance.get(`api/post/all`, {
      withCredentials: true,
      params: {
        limit,
        page,
      },
    });
    dispatch({ type: POST_SUCCESS, payload: data.posts });
    dispatch({ type: POST_METADATA_SET, payload: data });
  } catch (error) {
    dispatch({ type: POST_ERROR, payload: error.message });
  }
};
