export default function summonersReducer(state = [], action) {
  switch (action.type) {
    case "summoners/add": {
      if (state.some((summoner) => summoner.id === action.payload.id)) {
        return state;
      } else {
        return [...state, action.payload];
      }
    }
    case "summoners/attachMatches": {
      const summoner = state.find((sum) => sum.puuid === action.payload.puuid);
      if (summoner) {
        return [
          ...state.filter((sum) => sum.puuid !== action.payload.puuid),
          { ...summoner, matches: action.payload.matches },
        ];
      } else {
        return state;
      }
    }
    case "summoners/remove": {
      return state.filter((summoner) => summoner.id !== action.payload);
    }
    default:
      return state;
  }
}
