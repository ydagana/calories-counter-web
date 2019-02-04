import { call, put, take, fork } from "redux-saga/effects";
import request from "../services/request";
import { ApiConfig } from "../common/constants";
import { toast } from "react-toastify";

import {
  FETCH_MEALS,
  FETCH_MEALS_STATS,
  SUBMIT_ADD_MEAL,
  SUBMIT_DELETE_MEAL,
  SUBMIT_EDIT_MEAL
} from "../actions";
import {
  fetchMeals,
  fetchMealsError,
  fetchMealsStatsError,
  fetchMealsStatsSuccess,
  fetchMealsSuccess,
  submitAddMealError,
  submitAddMealSuccess,
  submitDeleteMealError,
  submitDeleteMealSuccess,
  submitEditMealError,
  submitEditMealSuccess,
  fetchMealsStats
} from "../actionCreators/meal.actions";
import { getItem } from "../services/localStorage";

export function* submitAddMealWatcher() {
  while (true) {
    const { payload } = yield take(SUBMIT_ADD_MEAL);
    yield call(submitAddMealWorker, payload);
  }
}

function* submitAddMealWorker(payload) {
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
    yield put(fetchMeals(response));
  } catch (err) {
    toast("Error! Could not add the meal.", { type: "error" });
    const errorMessage = err.message || "Error";
    yield put(submitAddMealError(errorMessage));
  }
}

export function* submitEditMealWatcher() {
  while (true) {
    const { payload } = yield take(SUBMIT_EDIT_MEAL);
    yield call(submitEditMealWorker, payload);
  }
}

function* submitEditMealWorker(payload) {
  try {
    const requestURL = `${ApiConfig.API_URL}/meals/${payload.id}`;

    const params = {
      method: "PATCH",
      body: JSON.stringify(payload)
    };
    const response = yield call(request, requestURL, params);
    toast("Meal successfully edited.", { type: "success" });
    yield put(submitEditMealSuccess(response));
    yield put(fetchMeals(response));
  } catch (err) {
    toast("Error! Could not update meal.", { type: "error" });
    const errorMessage = err.message || "Error";
    yield put(submitEditMealError(errorMessage));
  }
}

export function* submitDeleteMealWatcher() {
  while (true) {
    const { payload } = yield take(SUBMIT_DELETE_MEAL);
    yield call(submitDeleteMealWorker, payload);
  }
}

function* submitDeleteMealWorker(payload) {
  try {
    const requestURL = `${ApiConfig.API_URL}/meals/${payload}`;

    const params = {
      method: "DELETE"
    };
    const response = yield call(request, requestURL, params);
    toast("Meal successfully deleted.", { type: "success" });
    yield put(submitDeleteMealSuccess(response));
    yield put(fetchMeals(response));
  } catch (err) {
    toast("Error! Could not delete meal.", { type: "error" });
    const errorMessage = err.message || "Error";
    yield put(submitDeleteMealError(errorMessage));
  }
}

export function* fetchMealsWatcher() {
  while (true) {
    const { payload } = yield take(FETCH_MEALS);
    yield call(fetchMealsWorker, payload);
  }
}

function* fetchMealsWorker(payload) {
  try {
    const requestURL = `${ApiConfig.API_URL}/meals/searchUserMeals`;
    const response = yield call(request, requestURL, {
      method: "GET",
      query: { filter: JSON.stringify(payload) }
    });

    yield put(fetchMealsSuccess(response));
    yield put(fetchMealsStats(response));
  } catch (e) {
    yield put(fetchMealsError(e));
  }
}

export function* fetchMealsStatsWatcher() {
  while (true) {
    yield take(FETCH_MEALS_STATS);
    yield call(fetchMealsStatsWorker);
  }
}

function* fetchMealsStatsWorker() {
  try {
    const requestURL = `${ApiConfig.API_URL}/meals/userMealsStats`;
    const response = yield call(request, requestURL, {
      method: "GET"
    });

    yield put(fetchMealsStatsSuccess(response));
  } catch (e) {
    yield put(fetchMealsStatsError(e));
  }
}

export default function* mealSaga() {
  yield fork(submitDeleteMealWatcher);
  yield fork(submitEditMealWatcher);
  yield fork(submitAddMealWatcher);
  yield fork(fetchMealsWatcher);
  yield fork(fetchMealsStatsWatcher);
}
