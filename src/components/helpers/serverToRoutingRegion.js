import regions from "../../assets/json/routingRegions.json";

export function serverToRoutingRegion(server) {
  return regions.find((region) => region.region === server).routing;
}
