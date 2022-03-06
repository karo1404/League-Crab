import "./SummonerPageOtherPlayers.css";
import React from "react";
import { useSelector } from "react-redux";
import { formatStatsObject } from "../../../components/helpers/formatStats";
import Text from "../../../components/Text";

function SummonerPageOtherPlayers({ puuid }) {
  const stats = useSelector(
    (state) => state.summoners.find((sum) => sum.puuid === puuid)?.stats
  );

  return (
    <>
      {stats && (
        <div className="row m-0">
          <div className="col-sm mb-3">
            <div className="champions-column">
              <h4>
                <Text textId={"youPlayedWith"} />
              </h4>
              <ChampionBubbles players={stats.champions.ally} />
            </div>
          </div>
          <div className="col-sm mb-3">
            <div className="champions-column">
              <h4>
                <Text textId={"youPlayedAgainst"} />
              </h4>
              <ChampionBubbles players={stats.champions.enemy} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function ChampionBubbles({ players }) {
  const champSquareUrl =
    "https://ddragon.leagueoflegends.com/cdn/12.5.1/img/champion/";

  return (
    <div className="bubbles-container">
      {players &&
        players.map((player, index) => (
          <img
            key={`${player.champ}${index}`}
            src={`${champSquareUrl}${player.champ}.png`}
            alt={player.champ}
            className="bubble"
            title={`${formatStatsObject(player.kda)} ${player.champ}`}
          />
        ))}
    </div>
  );
}

export default SummonerPageOtherPlayers;
