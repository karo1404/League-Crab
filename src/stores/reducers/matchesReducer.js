export default function matchesReducer(state = [], action) {
  switch (action.type) {
    case "matches/add": {
      return state.some(
        (match) => match.metadata.matchId === action.payload.metadata.matchId
      )
        ? state
        : [...state, action.payload];
    }
    case "matches/remove": {
      return state.filter((match) => match.metadata.matchId !== action.payload);
    }
    default:
      return state;
  }
}
