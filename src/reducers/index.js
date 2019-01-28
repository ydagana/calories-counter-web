import { combineReducers } from "redux";
import appReducer from "./app.reducer";
import loginReducer from "./login.reducer";
import mealReducer from "./meal.reducer";

export default combineReducers({
  appReducer,
  loginReducer,
  mealReducer
});
