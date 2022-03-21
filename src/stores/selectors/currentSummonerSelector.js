import store from "../store";

export function selectCurrentSummonerPuuid() {
  return store.getState().currentSummoner;
}
