const fetch = require("node-fetch");

exports.handler = async function (event, context) {
  const eventBody = JSON.parse(event.body);
  const API_PATH = eventBody.path;
  const SERVER_NAME = eventBody.server;
  const { REACT_APP_RIOT_API_URL, REACT_APP_RIOT_API_KEY } = process.env;

  const URL = `https://${SERVER_NAME}.${REACT_APP_RIOT_API_URL}${API_PATH}`;

  const response = await fetch(URL, {
    method: "get",
    headers: { "X-Riot-Token": REACT_APP_RIOT_API_KEY },
  });
  return {
    statusCode: await response.status,
    body: JSON.stringify(await response.json()),
  };
};
