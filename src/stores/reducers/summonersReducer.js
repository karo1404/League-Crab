export default function summonersReducer(state = [], action) {
  switch (action.type) {
    case "summoners/add": {
      if (state.some((summoner) => summoner.puuid === action.payload.puuid)) {
        return state;
      } else {
        return [...state, action.payload];
      }
    }

    case "summoners/remove": {
      return state.filter((summoner) => summoner.puuid !== action.payload);
    }

    case "summoners/attachMatches": {
      const summoner = state.find((sum) => sum.puuid === action.payload.puuid);
      if (!summoner) return state;
      return [
        ...state.filter((sum) => sum.puuid !== action.payload.puuid),
        { ...summoner, matches: action.payload.matches },
      ];
    }

    case "summoners/attachStats": {
      const summoner = state.find((sum) => sum.puuid === action.payload.puuid);
      if (!summoner) return state;
      return [
        ...state.filter((sum) => sum.puuid !== action.payload.puuid),
        { ...summoner, stats: action.payload.stats },
      ];
    }

    case "summoners/setCrabScore": {
      const summoner = state.find((sum) => sum.puuid === action.payload.puuid);
      if (!summoner) return state;
      return [
        ...state.filter((sum) => sum.puuid !== action.payload.puuid),
        { ...summoner, crabScore: action.payload.crabScore },
      ];
    }

    case "summoners/addToCrabScore": {
      const summoner = state.find((sum) => sum.puuid === action.payload.puuid);
      if (!summoner) return state;
      return [
        ...state.filter((sum) => sum.puuid !== action.payload.puuid),
        {
          ...summoner,
          crabScore: summoner.crabScore + action.payload.crabScore,
        },
      ];
    }

    default:
      return state;
  }
}
