import { createStore, compose, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import reducer from "./reducers";
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();
const devTools =
  typeof window === "object" &&
  typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== "undefined"
    ? window.__REDUX_DEVTOOLS_EXTENSION__
    : () => f => f;

const enhancer = compose(
  applyMiddleware(sagaMiddleware),
  devTools()
);

const store = createStore(reducer, enhancer);
// We run the root saga automatically
sagaMiddleware.run(rootSaga);

export default store;
