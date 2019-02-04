import {
  FETCH_USER_DATA,
  SET_USER_DATA,
  FETCH_USER_DATA_ERROR,
  SUBMIT_LOGIN,
  SUBMIT_LOGIN_ERROR,
  SUBMIT_LOGIN_SUCCESS,
  LOGOUT_REQUEST,
  SUBMIT_REGISTER,
  SUBMIT_REGISTER_SUCCESS,
  SUBMIT_REGISTER_ERROR,
  SUBMIT_UPDATE_USER,
  SUBMIT_UPDATE_USER_SUCCESS,
  SUBMIT_UPDATE_USER_ERROR,
  SUBMIT_UPDATE_PASSWORD,
  SUBMIT_UPDATE_PASSWORD_SUCCESS,
  SUBMIT_UPDATE_PASSWORD_ERROR,
  FETCH_USERS,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_ERROR,
  DELETE_USER,
  DELETE_USER_SUCCESS,
  DELETE_USER_ERROR
} from "../actions";

export function submitLogin(payload) {
  return {
    type: SUBMIT_LOGIN,
    payload
  };
}

export function submitLoginSuccess(payload) {
  return {
    type: SUBMIT_LOGIN_SUCCESS,
    payload
  };
}

export function submitLoginError(payload) {
  return {
    type: SUBMIT_LOGIN_ERROR,
    payload
  };
}

export function submitRegister(payload) {
  return {
    type: SUBMIT_REGISTER,
    payload
  };
}

export function submitRegisterSuccess(payload) {
  return {
    type: SUBMIT_REGISTER_SUCCESS,
    payload
  };
}

export function submitRegisterError(payload) {
  return {
    type: SUBMIT_REGISTER_ERROR,
    payload
  };
}

export function submitUpdateUser(payload) {
  return {
    type: SUBMIT_UPDATE_USER,
    payload
  };
}

export function submitUpdateUserSuccess(payload) {
  return {
    type: SUBMIT_UPDATE_USER_SUCCESS,
    payload
  };
}

export function submitUpdateUserError(payload) {
  return {
    type: SUBMIT_UPDATE_USER_ERROR,
    payload
  };
}

export function submitUpdatePassword(payload) {
  return {
    type: SUBMIT_UPDATE_PASSWORD,
    payload
  };
}

export function submitUpdatePasswordSuccess(payload) {
  return {
    type: SUBMIT_UPDATE_PASSWORD_SUCCESS,
    payload
  };
}

export function submitUpdatePasswordError(payload) {
  return {
    type: SUBMIT_UPDATE_PASSWORD_ERROR,
    payload
  };
}

export function fetchUserData() {
  return {
    type: FETCH_USER_DATA
  };
}

export function setUserData(payload) {
  return {
    type: SET_USER_DATA,
    payload
  };
}

export function fetchUserDataError(payload) {
  return {
    type: FETCH_USER_DATA_ERROR,
    payload
  };
}

export function logoutRequest() {
  return {
    type: LOGOUT_REQUEST
  };
}

export function fetchUsers(payload) {
  return {
    type: FETCH_USERS,
    payload
  };
}

export function fetchUsersSuccess(payload) {
  return {
    type: FETCH_USERS_SUCCESS,
    payload
  };
}

export function fetchUsersError(payload) {
  return {
    type: FETCH_USERS_ERROR,
    payload
  };
}

export function deleteUser(payload) {
  return {
    type: DELETE_USER,
    payload
  };
}

export function deleteUserSuccess(payload) {
  return {
    type: DELETE_USER_SUCCESS,
    payload
  };
}

export function deleteUserError(payload) {
  return {
    type: DELETE_USER_ERROR,
    payload
  };
}
