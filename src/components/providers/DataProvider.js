import { createContext } from "react";
import React from "react";
import paths from "../../assets/json/apiPaths.json";

export const ApiContext = createContext();

export const DataProvider = ({ children }) => {
  const getSummonerByName = async (name, server) => {
    const path = paths.SummonerByName.replace("{summonerName}", name);
    makeApiRequest(path, null, server, null).then((result) => {
      return result;
    });
  };

  const provider = { getSummonerByName };

  return <ApiContext.Provider value={provider}>{children}</ApiContext.Provider>;
};

const makeApiRequest = async (path, queryParams, server, options) => {
  let result = null;
  let error = null;

  const query = queryParams
    ? Object.keys(queryParams).reduce((prev, key, index) => {
        let connector = index === 0 ? "?" : "&";
        return prev + connector + `${key}=${queryParams[key].value}`;
      })
    : "";

  //TODO: fix undefined on return
  fetch("/.netlify/functions/getApi", {
    ...options,
    method: "POST",
    body: JSON.stringify({ server: server, path: path + query }),
  })
    .then((response) => {
      if (response.ok) {
        return { result: response.json(), error: error };
      } else {
        return { result: null, error: response.text() };
      }
    })
    .catch((err) => {
      return { result: null, error: err.message };
    });
};
