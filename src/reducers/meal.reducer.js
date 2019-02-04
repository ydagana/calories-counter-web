import {
  FETCH_MEALS,
  FETCH_MEALS_ERROR,
  FETCH_MEALS_SUCCESS,
  SUBMIT_ADD_MEAL,
  SUBMIT_ADD_MEAL_ERROR,
  SUBMIT_ADD_MEAL_SUCCESS,
  SUBMIT_EDIT_MEAL,
  SUBMIT_EDIT_MEAL_ERROR,
  SUBMIT_EDIT_MEAL_SUCCESS,
  SUBMIT_DELETE_MEAL,
  SUBMIT_DELETE_MEAL_ERROR,
  SUBMIT_DELETE_MEAL_SUCCESS,
  FETCH_MEALS_STATS_ERROR,
  FETCH_MEALS_STATS,
  FETCH_MEALS_STATS_SUCCESS
} from "../actions";

const initialState = {
  mealForm: {
    submitting: false,
    error: null
  },
  meals: {
    details: [],
    fetching: false,
    error: null
  },
  mealsStats: [],
  deletingMeal: false
};

export default function mealReducer(state = initialState, action) {
  switch (action.type) {
    case SUBMIT_ADD_MEAL:
      return {
        ...state,
        mealForm: {
          submitting: true,
          error: null
        }
      };
    case SUBMIT_ADD_MEAL_SUCCESS:
      return {
        ...state,
        mealForm: {
          submitting: false,
          error: null
        }
      };
    case SUBMIT_ADD_MEAL_ERROR:
      return {
        ...state,
        mealForm: {
          submitting: false,
          error: action.payload
        }
      };
    case SUBMIT_EDIT_MEAL:
      return {
        ...state,
        mealForm: {
          submitting: true,
          error: null
        }
      };
    case SUBMIT_EDIT_MEAL_SUCCESS:
      return {
        ...state,
        mealForm: {
          submitting: false,
          error: null
        }
      };
    case SUBMIT_EDIT_MEAL_ERROR:
      return {
        ...state,
        mealForm: {
          submitting: false,
          error: action.payload
        }
      };
    case SUBMIT_DELETE_MEAL:
      return {
        ...state,
        deletingMeal: true
      };
    case SUBMIT_DELETE_MEAL_SUCCESS:
      return {
        ...state,
        deletingMeal: false
      };
    case SUBMIT_DELETE_MEAL_ERROR:
      return {
        ...state,
        deletingMeal: false
      };
    case FETCH_MEALS:
      return {
        ...state,
        meals: {
          details: [],
          fetching: true,
          error: null
        }
      };
    case FETCH_MEALS_SUCCESS:
      return {
        ...state,
        meals: {
          details: action.payload,
          fetching: false,
          error: null
        }
      };
    case FETCH_MEALS_ERROR:
      return {
        ...state,
        meals: {
          details: [],
          fetching: false,
          error: action.payload
        }
      };
    case FETCH_MEALS_STATS:
      return {
        ...state,
        mealsStats: []
      };
    case FETCH_MEALS_STATS_SUCCESS:
      return {
        ...state,
        mealsStats: action.payload
      };
    case FETCH_MEALS_STATS_ERROR:
      return {
        ...state,
        mealsStats: []
      };
    default:
      return state;
  }
}
