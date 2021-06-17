import { createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";

import { rootSaga } from "./saga";
import { users } from "./reducer";

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  combineReducers({
    users,
  }),
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);
