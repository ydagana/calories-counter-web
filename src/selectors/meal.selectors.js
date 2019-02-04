import { createSelector } from "reselect";

const selectMealsDomain = () => state => state.mealReducer;
export default selectMealsDomain;

export const selectMealForm = () =>
  createSelector(
    selectMealsDomain(),
    subState => subState.mealForm
  );

export const selectMeals = () =>
  createSelector(
    selectMealsDomain(),
    subState => subState.meals
  );

export const selectDeleteMealState = () =>
  createSelector(
    selectMealsDomain(),
    subState => subState.deletingMeal
  );

export const selectMealsStats = () =>
  createSelector(
    selectMealsDomain(),
    subState => subState.mealsStats
  );
