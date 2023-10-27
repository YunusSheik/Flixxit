import axios from "axios";
import {
  loginFailure,
  loginStart,
  loginSuccess,
  resetPasswordFailure,
  resetPasswordSuccess,
} from "./AuthActions";

// API CALLS FOR LOGIN
export const login = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

// API CALLS TO CHANGE PASSWORD
export const resetPassword = async (user, dispatch) => {
  try {
    const res = await axios.post("auth/forgotPassword", user);
    dispatch(resetPasswordSuccess());
  } catch (err) {
    dispatch(resetPasswordFailure());
  }
};
