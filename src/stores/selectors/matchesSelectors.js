import store from "../store";

export function selectMatchById(matchId) {
  return store
    .getState()
    .matches.find((match) => match.metadata.matchId === matchId);
}
