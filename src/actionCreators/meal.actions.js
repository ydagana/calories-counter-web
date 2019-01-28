import {
  SUBMIT_ADD_MEAL,
  SUBMIT_ADD_MEAL_ERROR,
  SUBMIT_ADD_MEAL_SUCCESS
} from "../actions";

export function submitAddMeal(payload) {
  return {
    type: SUBMIT_ADD_MEAL,
    payload
  };
}

export function submitAddMealSuccess(payload) {
  return {
    type: SUBMIT_ADD_MEAL_SUCCESS,
    payload
  };
}

export function submitAddMealError(payload) {
  return {
    type: SUBMIT_ADD_MEAL_ERROR,
    payload
  };
}
