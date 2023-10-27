// ACTIONS FOR LOGIN
export const loginStart = () => ({
  type: "LOGIN_START",
});

export const loginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});

export const loginFailure = () => ({
  type: "LOGIN_FAILURE",
});

export const logout = () => ({
  type: "LOGOUT",
});

// ACTIONS TO CHANGE PASSWORD
export const resetPasswordSuccess = (user) => ({
  type: "RESET_PASSWORD_SUCCESS",
  payload: user,
});
export const resetPasswordFailure = () => ({
  type: "RESET_PASSWORD_FAILURE",
});
