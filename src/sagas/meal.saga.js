import { call, put, take, fork } from "redux-saga/effects";
import request from "../services/request";
import { ApiConfig } from "../common/constants";
import { SUBMIT_ADD_MEAL } from "../actions";
import {
  submitAddMealError,
  submitAddMealSuccess
} from "../actionCreators/meal.actions";
import { getItem } from "../services/localStorage";

export function* submitAddMealWatcher() {
  while (true) {
    const { payload } = yield take(SUBMIT_ADD_MEAL);
    try {
      const requestURL = `${ApiConfig.API_URL}/meals`;
      const user_id = getItem("user_id");
      if (!user_id) {
        throw new Error("userId is required!");
      }

      const params = {
        method: "POST",
        body: JSON.stringify({ ...payload, user_id })
      };
      const response = yield call(request, requestURL, params);

      yield put(submitAddMealSuccess(response));
    } catch (err) {
      //display notif with error
      yield put(submitAddMealError(err));
    }
  }
}

export default function* mealSaga() {
  yield fork(submitAddMealWatcher);
}
