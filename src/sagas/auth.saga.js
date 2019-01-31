import { take, call, put, cancel, fork } from "redux-saga/effects";
import request from "../services/request";
import { setItem, removeItem } from "../services/localStorage";
import { SUBMIT_LOGIN, SUBMIT_LOGIN_ERROR, LOGOUT_REQUEST } from "../actions";
import { ApiConfig } from "../common/constants";
import {
  fetchUserData,
  setUserData,
  submitLoginError,
  submitLoginSuccess
} from "../actionCreators/user.actions";
import { toast } from "react-toastify";

export function* loginSaga() {
  while (true) {
    // listen for the LOGIN_REQUEST action dispatched on form submit
    const { payload } = yield take(SUBMIT_LOGIN);

    // execute the authorize task asynchronously
    const task = yield fork(authorize, payload);

    // listen for the LOGOUT or LOGIN_ERROR action
    const action = yield take([LOGOUT_REQUEST, SUBMIT_LOGIN_ERROR]);

    if (action.type === LOGOUT_REQUEST) {
      // since the authorize task executed asynchronously,
      // it is possible the LOGOUT action gets fired before
      // the the authorize task completes, so we call cancel on it
      yield cancel(task);
    } else {
      // remove jwt token from localstorage
      yield call(removeItem, "auth_token");
      yield call(removeItem, "user_id");
      yield call(removeItem, "auth_time");
    }
  }
}

export function* authorize(data) {
  try {
    yield call(setItem, "redirect_to_login", false);
    // send a post request with the login credentials
    const response = yield call(request, `${ApiConfig.API_URL}/users/login`, {
      method: "POST",
      body: JSON.stringify(data)
    });
    if (response.error && response.error.message) {
      throw new Error(response.error.message);
    }

    // store auth token to localstorage
    yield call(setItem, "auth_token", response.id);
    yield call(setItem, "user_id", response.userId);
    yield call(setItem, "auth_time", new Date().getTime());
    yield put(submitLoginSuccess());

    // fetch details of authenticated user
    yield put(fetchUserData());

    // return the response from the generator task
    return response;
  } catch (err) {
    const errorMessage = err.message || "Error! Try again later.";
    toast(errorMessage, { type: "error" });
    yield put(submitLoginError(err));
  }
}

export function* logoutSaga() {
  while (true) {
    yield take(LOGOUT_REQUEST);

    // Redirect to login page before setting auth state.
    // This way no components will attempt to re-render using
    // absent user data.
    // manually push the location state to the login URL, since replace will try to update redux state, which we do not want
    yield call(logout);
    yield call(() => {
      window.location.replace("/login");
    });

    yield put(setUserData(null));
  }
}

export function* logout() {
  try {
    const requestURL = `${ApiConfig}/users/logout`;
    const params = {
      method: "POST"
    };
    yield call(removeItem, "auth_token");
    yield call(removeItem, "user_id");
    yield call(removeItem, "auth_time");

    yield call(request, requestURL, params);
  } catch (err) {
    // console.warn("error: ", err);
  }
}

export default function* authSaga() {
  yield fork(loginSaga);
  yield fork(logoutSaga);
}
