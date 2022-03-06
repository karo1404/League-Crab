import store from "../store";

export function selectSummonerWithNameAndRegion(name, region) {
  return store
    .getState()
    .summoners.find((sum) => sum.name === name && sum.region.region === region);
}

export function selectSummonerWithPuuid(puuid) {
  return store.getState().summoners.find((sum) => sum.puuid === puuid);
}

export function selectMatchIdsWithPuuid(puuid, region) {
  const summoner = store
    .getState()
    .summoners.find(
      (sum) => sum.puuid === puuid && sum.region.region === region
    );
  return summoner.matches ? summoner.matches : undefined;
}
