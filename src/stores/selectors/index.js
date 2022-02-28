import store from "../store";

export function selectSummonerWithNameAndRegion(name, region) {
  return store
    .getState()
    .summoners.find((sum) => sum.name === name && sum.region.region === region);
}
