export default function currentSummonerReducer(state = [], action) {
  switch (action.type) {
    case "currentSummoner/set": {
      return action.payload;
    }

    default:
      return state;
  }
}
