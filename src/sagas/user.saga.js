import { call, put, take } from "redux-saga/effects";
import request from "../services/request";
import { ApiConfig } from "../common/constants";
import {
  fetchUserDataError,
  setUserData
} from "../actionCreators/user.actions";
import { getItem } from "../services/localStorage";
import { FETCH_USER_DATA } from "../actions";

export default function* userSaga() {
  while (true) {
    yield take(FETCH_USER_DATA);
    yield call(fetchUserFromToken);
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
