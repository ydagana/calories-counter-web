import { call, put, take, fork } from "redux-saga/effects";
import request from "../services/request";
import { ApiConfig } from "../common/constants";
import {
  fetchUserDataError,
  setUserData,
  submitRegisterError,
  submitRegisterSuccess
} from "../actionCreators/user.actions";
import { getItem } from "../services/localStorage";
import { FETCH_USER_DATA, SUBMIT_REGISTER } from "../actions";
import { toast } from "react-toastify";

export function* RegisterUserWatcher() {
  while (true) {
    const { payload } = yield take(SUBMIT_REGISTER);
    yield call(RegisterUserWorker, payload);
  }
}

export function* fetchUserWatcher() {
  while (true) {
    yield take(FETCH_USER_DATA);
    yield call(fetchUserFromToken);
  }
}

function* RegisterUserWorker(payload) {
  try {
    const requestURL = `${ApiConfig.API_URL}/users`;

    const params = {
      method: "POST",
      body: JSON.stringify(payload)
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

export function* fetchUserFromToken() {
  const userId = getItem("user_id");
  const authToken = getItem("auth_token");

  if (!authToken) {
    return;
  }

  try {
    const requestURL = `${ApiConfig.API_URL}/users/${userId}`;
    const response = yield call(request, requestURL);

    yield put(setUserData(response));
    yield put(window.location.replace("/dashboard")); // eslint-disable-line
  } catch (e) {
    yield put(fetchUserDataError(e));
  }
}

export default function* userSaga() {
  yield fork(fetchUserWatcher);
  yield fork(RegisterUserWatcher);
}
