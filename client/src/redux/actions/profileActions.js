import {
  PROFILE_LOADING,
  PROFILE_ERROR,
  PROFILE_SUCCESS,
} from "../constants/profileConstants";
import instance from "../../instance";
import {
  PROFILE_PIC_ERROR,
  PROFILE_PIC_LOADED,
  PROFILE_PIC_LOADING,
} from "../constants/userConstants";

export const getProfile = () => async (dispatch) => {
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

export const addProfile = (profile) => async (dispatch) => {
  try {
    dispatch({ type: PROFILE_LOADING });
    const { data } = await instance.post(`api/profile`, profile, {
      withCredentials: true,
    });
    console.log(data);
    dispatch({ type: PROFILE_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: PROFILE_ERROR, payload: error.message });
  }
};

export const updateProfilePicture =
  (avatar, name, toggleModal, showToast) => async (dispatch) => {
    try {
      dispatch({ type: PROFILE_PIC_LOADING });
      const form = new FormData();
      form.append("avatar", avatar);
      form.append("name", name);
      const { data } = await instance.post("/api/profile/avatar", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch({
        type: PROFILE_PIC_LOADED,
        payload: { name: data.user.name, avatar: data.user.avatar },
      });
      toggleModal();
      showToast(data.message);
    } catch (error) {
      dispatch({
        type: PROFILE_PIC_ERROR,
        payload: error.response.data.message,
      });
    }
  };
