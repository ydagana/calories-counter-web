import {
  SUBMIT_ADD_MEAL,
  SUBMIT_ADD_MEAL_ERROR,
  SUBMIT_ADD_MEAL_SUCCESS
} from "../actions";

const initialState = {
  mealForm: {
    submitting: false,
    error: null
  }
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
    default:
      return state;
  }
}
