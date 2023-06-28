import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";
import slots from "./slots/reducer";
import notifications from "./notifications/reducer";
import { loadState, stateMiddleware } from "./storage";

const initial = loadState() || {};
const reducer = combineReducers({
  slots,
  notifications,
});

const store = createStore(
  reducer,
  initial,
  applyMiddleware(logger, stateMiddleware)
);

export default store;
