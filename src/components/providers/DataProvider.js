import { createContext } from "react";
import React from "react";
import paths from "../../assets/json/apiPaths.json";
import { selectSummonerWithNameAndRegion } from "../../stores/selectors";

export const ApiContext = createContext();

export const DataProvider = ({ children }) => {
  const getSummonerByName = async (name, server) => {
    const cachedSummoner = selectSummonerWithNameAndRegion(name, server);
    if (cachedSummoner) {
      return { result: cachedSummoner, error: null };
    } else {
      const path = paths.SummonerByName.replace("{summonerName}", name);
      return makeApiRequest(path, null, server, null).then((result) => {
        return result;
      });
    }
  };

  const provider = { getSummonerByName };

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
          let connector = index === 0 ? "?" : "&";
          return prev + connector + `${key}=${queryParamsObject[key].value}`;
        })
      : "";
  }
};
