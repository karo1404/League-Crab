export default function matchesReducer(state = [], action) {
  switch (action.type) {
    case "matches/add": {
      return [...state, action.payload];
    }
    case "matches/remove": {
      return state.filter((match) => match.metadata.id !== action.payload);
    }
    default:
      return state;
  }
}
