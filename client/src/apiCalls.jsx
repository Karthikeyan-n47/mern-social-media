import axios from "./axios";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  loginFailure,
  loginStart,
  loginSuccess,
  logoutFailure,
  logoutStart,
  logoutSuccess,
} from "./redux/user/userSlice";

export const loginCall = async (userCredentials, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(`/auth/login`, userCredentials);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure(err));
  }
};

export const logoutCall = async (dispatch) => {
  dispatch(logoutStart());
  try {
    await axios.post("/auth/logout");
    dispatch(logoutSuccess());
  } catch (err) {
    dispatch(logoutFailure(err));
  }
};

export const deleteUserCall = async (userId, dispatch) => {
  dispatch(deleteUserStart());
  try {
    await axios.delete(`/users/${userId}`);
    dispatch(deleteUserSuccess());
  } catch (err) {
    dispatch(deleteUserFailure);
  }
};

/*
export const loginCall = async (userCredentials, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post(`auth/login`, userCredentials);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
};

export const logoutCall = (dispatch) => {
  dispatch({ type: "LOGOUT" });
};
*/
