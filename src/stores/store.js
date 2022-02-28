import { createStore, combineReducers } from "redux";
import matchesReducer from "./reducers/matchesReducer";
import summonersReducer from "./reducers/summonersReducer";

const rootReducer = combineReducers({
  summoners: summonersReducer,
  matches: matchesReducer,
});

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
