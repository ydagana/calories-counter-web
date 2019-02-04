import { getItem } from "../services/localStorage";
import {
  FETCH_USERS,
  FETCH_USERS_ERROR,
  FETCH_USERS_SUCCESS,
  SET_USER_DATA,
  SUBMIT_UPDATE_PASSWORD,
  SUBMIT_UPDATE_PASSWORD_ERROR,
  SUBMIT_UPDATE_PASSWORD_SUCCESS,
  SUBMIT_UPDATE_USER,
  SUBMIT_UPDATE_USER_ERROR,
  SUBMIT_UPDATE_USER_SUCCESS
} from "../actions";

const initialState = {
  loggedIn: !!getItem("auth_token"),
  loginError: null,
  userData: null,
  updatingUser: false,
  updatingUsersPassword: false,
  users: {
    details: [],
    fetching: false,
    error: null
  }
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        userData: action.payload
      };
    case SUBMIT_UPDATE_USER:
      return {
        ...state,
        updatingUser: true
      };
    case SUBMIT_UPDATE_USER_SUCCESS:
      return {
        ...state,
        updatingUser: false,
        userData: action.payload
      };
    case SUBMIT_UPDATE_USER_ERROR:
      return {
        ...state,
        updatingUser: false
      };
    case SUBMIT_UPDATE_PASSWORD:
      return {
        ...state,
        updatingUsersPassword: true
      };
    case SUBMIT_UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        updatingUsersPassword: false
      };
    case SUBMIT_UPDATE_PASSWORD_ERROR:
      return {
        ...state,
        updatingUsersPassword: false
      };
    case FETCH_USERS:
      return {
        ...state,
        users: {
          details: [],
          fetching: true,
          error: null
        }
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: {
          details: action.payload,
          fetching: false,
          error: null
        }
      };
    case FETCH_USERS_ERROR:
      return {
        ...state,
        users: {
          details: [],
          fetching: false,
          error: action.payload
        }
      };
    default:
      return state;
  }
}
