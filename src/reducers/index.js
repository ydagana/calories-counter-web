import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import loginReducer from "./login.reducer";
import mealReducer from "./meal.reducer";

export default combineReducers({
  userReducer,
  loginReducer,
  mealReducer
});
