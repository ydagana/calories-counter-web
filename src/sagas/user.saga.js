import { call, put, take, fork } from "redux-saga/effects";
import request from "../services/request";
import { ApiConfig } from "../common/constants";
import { getItem } from "../services/localStorage";
import {
  deleteUserError,
  deleteUserSuccess,
  fetchUserDataError,
  fetchUsersError,
  fetchUsersSuccess,
  fetchUsers,
  setUserData,
  submitRegisterError,
  submitRegisterSuccess,
  submitUpdatePasswordError,
  submitUpdatePasswordSuccess,
  submitUpdateUserError,
  submitUpdateUserSuccess
} from "../actionCreators/user.actions";
import {
  DELETE_USER,
  FETCH_USER_DATA,
  FETCH_USERS,
  SUBMIT_REGISTER,
  SUBMIT_UPDATE_PASSWORD,
  SUBMIT_UPDATE_USER
} from "../actions";
import { toast } from "react-toastify";

export function* registerUserWatcher() {
  while (true) {
    const { payload } = yield take(SUBMIT_REGISTER);
    yield call(registerUserWorker, payload);
  }
}

export function* updateUserWatcher() {
  while (true) {
    const { payload } = yield take(SUBMIT_UPDATE_USER);
    yield call(updateUserWorker, payload);
  }
}

export function* updatePasswordWatcher() {
  while (true) {
    const { payload } = yield take(SUBMIT_UPDATE_PASSWORD);
    yield call(updatePasswordWorker, payload);
  }
}

export function* fetchUserWatcher() {
  while (true) {
    yield take(FETCH_USER_DATA);
    yield call(fetchUserFromToken);
  }
}

function* registerUserWorker(payload) {
  try {
    const requestURL = `${ApiConfig.API_URL}/users`;

    const params = {
      method: "POST",
      body: JSON.stringify({ caloriesGoal: 1500, ...payload })
    };
    const response = yield call(request, requestURL, params);
    if (response.error && response.error.message) {
      throw new Error(response.error.message);
    }
    yield put(submitRegisterSuccess(response));
    yield put(window.location.replace("/login"));
  } catch (err) {
    let errorMessage = "";
    if (err.message && err.message.indexOf("Email already exists") !== -1) {
      errorMessage = "Email already exists!";
    }
    if (err.message && err.message.indexOf("User already exists") !== -1) {
      errorMessage = "Username already exists!";
    }
    errorMessage = errorMessage || err.message || "Error! Try again later.";
    toast(errorMessage, { type: "error" });
    yield put(submitRegisterError(errorMessage));
  }
}

function* updateUserWorker(payload) {
  try {
    const requestURL = `${ApiConfig.API_URL}/users/${payload.id}`;

    const params = {
      method: "PATCH",
      body: JSON.stringify(payload)
    };
    const response = yield call(request, requestURL, params);

    yield put(submitUpdateUserSuccess(response));
    toast("Profile successfully updated.", { type: "success" });
  } catch (err) {
    let errorMessage = err.message || "Error! Try again later.";
    toast(errorMessage, { type: "error" });
    yield put(submitUpdateUserError(errorMessage));
  }
}

function* updatePasswordWorker(payload) {
  try {
    const requestURL = `${ApiConfig.API_URL}/users/change-password`;

    const params = {
      method: "POST",
      body: JSON.stringify(payload)
    };
    const response = yield call(request, requestURL, params);

    yield put(submitUpdatePasswordSuccess(response));
    toast("Password updated successfully.", { type: "success" });
  } catch (err) {
    let errorMessage = err.message || "Error! Try again later.";
    toast(errorMessage, { type: "error" });
    yield put(submitUpdatePasswordError(errorMessage));
  }
}

export function* fetchUserFromToken() {
  const userId = getItem("user_id");
  const authToken = getItem("auth_token");

  if (!authToken) {
    return;
  }

  try {
    const filter = JSON.stringify({ include: [{ relation: "role" }] });
    const requestURL = `${ApiConfig.API_URL}/users/${userId}?filter=${filter}`;
    const response = yield call(request, requestURL);

    yield put(setUserData(response));
    if (window.location.pathname === "/login") {
      yield put(window.location.replace("/dashboard"));
    }
  } catch (e) {
    yield put(fetchUserDataError(e));
  }
}

export function* fetchUsersWatcher() {
  while (true) {
    const { payload } = yield take(FETCH_USERS);
    yield call(fetchUsersWorker, payload);
  }
}

function* fetchUsersWorker() {
  try {
    const requestURL = `${ApiConfig.API_URL}/users/getUsers`;
    const response = yield call(request, requestURL, {
      method: "GET"
    });

    yield put(fetchUsersSuccess(response));
  } catch (e) {
    yield put(fetchUsersError(e));
  }
}

export function* submitDeleteUserWatcher() {
  while (true) {
    const { payload } = yield take(DELETE_USER);
    yield call(submitDeleteUserWorker, payload);
  }
}

function* submitDeleteUserWorker(payload) {
  try {
    const requestURL = `${ApiConfig.API_URL}/users/deleteUser?id=${payload}`;

    const params = {
      method: "DELETE"
    };
    const response = yield call(request, requestURL, params);
    toast("User deleted successfully.", { type: "success" });
    yield put(deleteUserSuccess(response));
    yield put(fetchUsers());
  } catch (err) {
    toast("Error! Could not delete user.", { type: "error" });
    const errorMessage = err.message || "Error";
    yield put(deleteUserError(errorMessage));
  }
}

export default function* userSaga() {
  yield fork(updateUserWatcher);
  yield fork(fetchUserWatcher);
  yield fork(registerUserWatcher);
  yield fork(updatePasswordWatcher);
  yield fork(fetchUsersWatcher);
  yield fork(submitDeleteUserWatcher);
}
