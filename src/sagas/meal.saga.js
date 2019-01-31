import { call, put, take, fork } from "redux-saga/effects";
import request, { composeQueryString } from "../services/request";
import { ApiConfig } from "../common/constants";
import { toast } from "react-toastify";

import { FETCH_MEALS, SUBMIT_ADD_MEAL } from "../actions";
import {
  fetchMealsError,
  fetchMealsSuccess,
  submitAddMealError,
  submitAddMealSuccess
} from "../actionCreators/meal.actions";
import { getItem } from "../services/localStorage";

export function* submitAddMealWatcher() {
  while (true) {
    const { payload } = yield take(SUBMIT_ADD_MEAL);
    yield call(submitAddMealWorker, payload);
  }
}

function* submitAddMealWorker(payload) {
  const authToken = getItem("auth_token");
  if (!authToken) {
    return;
  }
  try {
    const requestURL = `${ApiConfig.API_URL}/meals`;
    const userId = getItem("user_id");
    if (!userId) {
      throw new Error("userId is required!");
    }

    const params = {
      method: "POST",
      body: JSON.stringify({ ...payload, userId })
    };
    const response = yield call(request, requestURL, params);
    toast("Good job! You added a meal.", { type: "success" });

    yield put(submitAddMealSuccess(response));
  } catch (err) {
    toast("Error! Could not add the meal.", { type: "error" });
    const errorMessage = err.message || "Error";
    yield put(submitAddMealError(errorMessage));
  }
}

export function* fetchMealsWatcher() {
  while (true) {
    const { payload } = yield take(FETCH_MEALS);
    yield call(fetchMealsWorker, payload);
  }
}

function* fetchMealsWorker(payload) {
  const authToken = getItem("auth_token");
  if (!authToken) {
    return;
  }
  const userId = getItem("user_id");
  if (!userId) {
    throw new Error("userId is required!");
  }

  try {
    const limit = 50;
    const offset = payload.skip || 0;
    const filter = {
      limit
    };

    if (offset > 0) {
      filter.offset = offset;
    }

    const queryString = composeQueryString(filter);
    const requestURL = `${
      ApiConfig.API_URL
    }/users/${userId}/meals?${queryString}`;
    const response = yield call(request, requestURL, {
      method: "GET"
    });

    yield put(fetchMealsSuccess(response));
  } catch (e) {
    console.log(e);
    yield put(fetchMealsError(e));
  }
}

export default function* mealSaga() {
  yield fork(submitAddMealWatcher);
  yield fork(fetchMealsWatcher);
}
