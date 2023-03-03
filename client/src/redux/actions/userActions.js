import instance from "../../instance";
import {
  CLEAR_ERRORS,
  LOAD_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "../constants/userConstants";
export const login =
  (email, password, navigate, setToast) => async (dispatch) => {
    try {
      dispatch({ type: LOGIN_REQUEST });
      const { data } = await instance.post(`api/users/login`, {
        email,
        password,
      });
      dispatch({ type: LOGIN_SUCCESS, payload: data });
      navigate("/");
    } catch (error) {
      setToast(error.response.data.message);
      dispatch({ type: LOGIN_FAIL, payload: error.message });
    }
  };
export const register =
  (name, email, password, handleToast) => async (dispatch) => {
    try {
      dispatch({ type: REGISTER_REQUEST });
      const { data } = await instance.post(`api/users/register`, {
        name,
        email,
        password,
      });
      dispatch({ type: REGISTER_SUCCESS, payload: data });
      handleToast({ error: false, message: "User register" });
    } catch (error) {
      handleToast({
        message: error.response.data?.message
          ? error.response.data?.message
          : "Error occured",
        error: true,
      });
      dispatch({ type: REGISTER_FAIL, payload: "Error occured" });
    }
  };
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });
    const { data } = await instance.get(`api/users`);
    dispatch({ type: LOAD_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: LOAD_USER_FAIL, payload: error.message });
  }
};
export const logout = () => async (dispatch) => {
  try {
    await instance.post("/api/users/logout");
    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({ type: LOGOUT_FAIL, payload: error.message });
  }
};
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
