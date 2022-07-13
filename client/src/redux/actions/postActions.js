import instance from "../../instance";
import {
  POST_ERROR,
  POST_LOADING,
  POST_METADATA_SET,
  POST_REQUEST_ERROR,
  POST_REQUEST_LOADING,
  POST_REQUEST_RESET,
  POST_REQUEST_SUCCESS,
  POST_SUCCESS,
} from "../constants/postsConstants";

export const addPost = (post) => async (dispatch) => {
  try {
    dispatch({ type: POST_REQUEST_RESET });
    dispatch({ type: POST_REQUEST_LOADING });
    const { data } = await instance.post("/api/post", post, {
      withCredentials: true,
    });
    dispatch({ type: POST_REQUEST_SUCCESS, payload: data.post });
  } catch (error) {
    dispatch({ type: POST_REQUEST_ERROR, payload: error });
  }
};
export const getAllPosts = (limit, page, s) => async (dispatch) => {
  try {
    dispatch({ type: POST_LOADING });
    const { data } = await instance.get(`api/post/all`, {
      withCredentials: true,
      params: {
        limit,
        page,
        s,
      },
    });
    dispatch({ type: POST_SUCCESS, payload: data.posts });
    dispatch({ type: POST_METADATA_SET, payload: data });
  } catch (error) {
    dispatch({ type: POST_ERROR, payload: error.message });
  }
};
export const likePost = async (postId) => {
  try {
    const { data } = await instance.post(
      "api/post/like",
      { postId },
      {
        withCredentials: true,
      }
    );
    return data.status;
  } catch (e) {
    throw e;
  }
};
