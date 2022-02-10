import { createStore, combineReducers } from "redux";
import matchesReducer from "./reducers/matchesReducer";
import summonersReducer from "./reducers/summonersReducer";

const rootReducer = combineReducers({
  Summoners: summonersReducer,
  Matches: matchesReducer,
});

const store = createStore(rootReducer);

export default store;
