import { createStore, combineReducers } from "redux";
import matchesReducer from "./reducers/matchesReducer";
import summonersReducer from "./reducers/summonersReducer";

const rootReducer = combineReducers({
  summoners: summonersReducer,
  matches: matchesReducer,
});

const store = createStore(rootReducer);

export default store;
