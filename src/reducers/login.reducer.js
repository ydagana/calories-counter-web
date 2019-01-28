import {
  SUBMIT_LOGIN,
  SUBMIT_LOGIN_ERROR,
  SUBMIT_LOGIN_SUCCESS
} from "../actions";

const initialState = {
  submitting: false,
  error: null
};

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case SUBMIT_LOGIN:
      return {
        ...state,
        submitting: true,
        error: null
      };
    case SUBMIT_LOGIN_SUCCESS:
      return {
        ...state,
        submitting: false,
        error: null
      };
    case SUBMIT_LOGIN_ERROR:
      return {
        ...state,
        submitting: true,
        error: action.payload
      };
    default:
      return state;
  }
}
