import { all, fork } from "redux-saga/effects";
import authSaga from "./auth.saga";
import userSaga from "./user.saga";
import mealSaga from "./meal.saga";

export default function* rootSaga() {
  yield all([fork(authSaga), fork(userSaga), fork(mealSaga)]);
}
