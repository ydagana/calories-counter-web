import { createSelector } from "reselect";

const selectAppDomain = () => state => state.userReducer;
export default selectAppDomain;

export const selectUserData = () =>
  createSelector(
    selectAppDomain(),
    subState => subState.userData
  );

export const selectUserUpdatingState = () =>
  createSelector(
    selectAppDomain(),
    subState => subState.updatingUser
  );

export const selectPasswordUpdatingState = () =>
  createSelector(
    selectAppDomain(),
    subState => subState.updatingUsersPassword
  );

export const selectUsers = () =>
  createSelector(
    selectAppDomain(),
    subState => subState.users
  );
