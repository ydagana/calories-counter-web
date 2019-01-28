import { getItem } from "../services/localStorage";

const initialState = {
  loggedIn: !!getItem("auth_token"),
  loginError: null,
  userData: null
};

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
