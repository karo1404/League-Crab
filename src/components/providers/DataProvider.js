import { createContext } from "react";
import React from "react";
import paths from "../../assets/json/apiPaths.json";
import { selectMatchById } from "../../stores/selectors/matchesSelectors";
import {
  selectSummonerWithNameAndRegion,
  selectMatchIdsWithPuuid,
} from "../../stores/selectors/summonerSelectors";
import { serverToRoutingRegion } from "../helpers/serverToRoutingRegion";
import { useDispatch } from "react-redux";
import { findRegionFromName } from "../helpers/findRegionFromName";

export const ApiContext = createContext();

export const DataProvider = ({ children }) => {
  const dispatch = useDispatch();

  async function getSummonerByName(name, server) {
    const cachedSummoner = selectSummonerWithNameAndRegion(name, server);
    if (cachedSummoner) {
      return { result: cachedSummoner, error: null };
    } else {
      const path = paths.SummonerByName.replace("{summonerName}", name);
      return makeApiRequest(path, null, server, null).then((result) => {
        if (result.result) {
          dispatch({
            type: "summoners/add",
            payload: {
              ...result.result,
              crabScore: 0,
              region: findRegionFromName(server),
            },
          });
        }
        return result;
      });
    }
  }

  async function getMatchIdsByPuuid(puuid, server, numberOfMatches) {
    const cachedMatches = selectMatchIdsWithPuuid(puuid, server);
    if (cachedMatches && cachedMatches.length >= numberOfMatches) {
      return { result: cachedMatches.slice(0, numberOfMatches), error: null };
    } else {
      const path = paths.ListOfMatchIdsByPuuid.replace("{puuid}", puuid);
      return makeApiRequest(
        path,
        { count: numberOfMatches },
        serverToRoutingRegion(server),
        null
      ).then((result) => {
        if (result.result) {
          dispatch({
            type: "summoners/attachMatches",
            payload: { matches: result.result, puuid },
          });
        }
        return result;
      });
    }
  }

  async function getMatchByMatchId(matchId, server) {
    const cachedMatch = selectMatchById(matchId);
    if (cachedMatch) {
      return { result: cachedMatch, error: null };
    } else {
      const path = paths.MatchByMatchId.replace("{matchId}", matchId);
      return makeApiRequest(
        path,
        null,
        serverToRoutingRegion(server),
        null
      ).then((result) => {
        if (result.result) {
          dispatch({ type: "matches/add", payload: result.result });
        }
        return result;
      });
    }
  }

  const provider = { getSummonerByName, getMatchIdsByPuuid, getMatchByMatchId };

  return <ApiContext.Provider value={provider}>{children}</ApiContext.Provider>;
};

const makeApiRequest = async (path, queryParams, server, options) => {
  const query = buildQueryParamsString(queryParams);
  let fetchStatus = 0;
  return fetch("/.netlify/functions/getApi", {
    ...options,
    method: "POST",
    body: JSON.stringify({ server: server, path: path + query }),
  })
    .then((response) => {
      fetchStatus = response.status;
      return response.json();
    })
    .then((data) => {
      if (fetchStatus >= 200 && fetchStatus < 300) {
        return { result: data, error: null };
      } else {
        return { result: null, error: data.status.status_code };
      }
    })
    .catch((err) => {
      return { result: null, error: err.message };
    });

  function buildQueryParamsString(queryParamsObject) {
    return queryParamsObject
      ? Object.keys(queryParamsObject).reduce((prev, key, index) => {
          const connector = index === 0 ? "?" : "&";
          return `${prev}${connector}${key}=${queryParamsObject[key]}`;
        }, "")
      : "";
  }
};
