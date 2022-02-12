import servers from "../../assets/json/regions.json";

export function findRegionFromName(shortServerName) {
  return servers.find(
    (region) => region.short.toLowerCase() === shortServerName.toLowerCase()
  );
}
