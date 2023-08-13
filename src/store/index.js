import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";
import slots from "./slots/reducer";
import creatures from "./creatures/reducer";
import backpack from "./backpack/reducer";
import bellCount from "./bellCount/reducer";
import notifications from "./notifications/reducer";
import final from "./final/reducer";
import { loadState, stateMiddleware } from "./storage";

const initial = loadState() || {};
const reducer = combineReducers({
  slots,
  creatures,
  backpack,
  bellCount,
  notifications,
  final,
});

const store = createStore(
  reducer,
  initial,
  applyMiddleware(logger, stateMiddleware)
);

export default store;
