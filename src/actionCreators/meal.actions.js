import {
  FETCH_MEALS,
  FETCH_MEALS_ERROR,
  FETCH_MEALS_STATS,
  FETCH_MEALS_STATS_ERROR,
  FETCH_MEALS_STATS_SUCCESS,
  FETCH_MEALS_SUCCESS,
  SUBMIT_ADD_MEAL,
  SUBMIT_ADD_MEAL_ERROR,
  SUBMIT_ADD_MEAL_SUCCESS,
  SUBMIT_DELETE_MEAL,
  SUBMIT_DELETE_MEAL_ERROR,
  SUBMIT_DELETE_MEAL_SUCCESS,
  SUBMIT_EDIT_MEAL,
  SUBMIT_EDIT_MEAL_ERROR,
  SUBMIT_EDIT_MEAL_SUCCESS
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

export function submitEditMeal(payload) {
  return {
    type: SUBMIT_EDIT_MEAL,
    payload
  };
}

export function submitEditMealSuccess(payload) {
  return {
    type: SUBMIT_EDIT_MEAL_SUCCESS,
    payload
  };
}

export function submitEditMealError(payload) {
  return {
    type: SUBMIT_EDIT_MEAL_ERROR,
    payload
  };
}

export function submitDeleteMeal(payload) {
  return {
    type: SUBMIT_DELETE_MEAL,
    payload
  };
}

export function submitDeleteMealSuccess(payload) {
  return {
    type: SUBMIT_DELETE_MEAL_SUCCESS,
    payload
  };
}

export function submitDeleteMealError(payload) {
  return {
    type: SUBMIT_DELETE_MEAL_ERROR,
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

export function fetchMealsStats(payload) {
  return {
    type: FETCH_MEALS_STATS,
    payload
  };
}

export function fetchMealsStatsSuccess(payload) {
  return {
    type: FETCH_MEALS_STATS_SUCCESS,
    payload
  };
}

export function fetchMealsStatsError(payload) {
  return {
    type: FETCH_MEALS_STATS_ERROR,
    payload
  };
}
