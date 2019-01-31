import {
  FETCH_MEALS,
  FETCH_MEALS_ERROR,
  FETCH_MEALS_SUCCESS,
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

export function fetchMeals(payload) {
  return {
    type: FETCH_MEALS,
    payload
  };
}

export function fetchMealsSuccess(payload) {
  return {
    type: FETCH_MEALS_SUCCESS,
    payload
  };
}

export function fetchMealsError(payload) {
  return {
    type: FETCH_MEALS_ERROR,
    payload
  };
}
