export default function summonersReducer(state = [], action) {
  switch (action.type) {
    case "summoners/add": {
      if (state.some((summoner) => summoner.id === action.payload.id)) {
        return state;
      } else {
        return [...state, action.payload];
      }
    }
    case "summoners/remove": {
      return state.filter((summoner) => summoner.id !== action.payload);
    }
    default:
      return state;
  }
}
