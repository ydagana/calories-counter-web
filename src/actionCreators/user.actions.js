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
  SUBMIT_REGISTER_ERROR
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
