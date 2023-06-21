import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import { loadState, stateMiddleware } from "./storage";

const initial = loadState();
const reducer = (state) => state;

const store = createStore(
  reducer,
  initial,
  applyMiddleware(logger, stateMiddleware)
);

export default store;
