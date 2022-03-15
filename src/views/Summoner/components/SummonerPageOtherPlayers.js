import "./SummonerPageOtherPlayers.css";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { formatStatsObject } from "../../../components/helpers/formatStats";
import Text from "../../../components/Text";
import TooltipBubble from "../../../components/TooltipBubble";
import champion from "../../../assets/json/champion.json";

function SummonerPageOtherPlayers({ puuid }) {
  const stats = useSelector(
    (state) => state.summoners.find((sum) => sum.puuid === puuid)?.stats
  );

  useEffect(() => {
    return;
  });

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
  const [showTooltipBubbleKey, setShowTooltipBubbleKey] = useState(false);
  const champSquareUrl =
    "https://ddragon.leagueoflegends.com/cdn/12.5.1/img/champion/";

  function handleMouseEnter(e, key) {
    setShowTooltipBubbleKey(key);
  }

  function handleMouseLeave(e) {
    setShowTooltipBubbleKey("");
  }

  function formatChampName(name = "") {
    return champion.data[name]?.name;
  }

  return (
    <div className="bubbles-container">
      {players &&
        players.map((player, index) => {
          const champion =
            player.champ === "FiddleSticks" ? "Fiddlesticks" : player.champ;
          return (
            <span key={`${champion}${index}`}>
              <img
                src={`${champSquareUrl}${champion}.png`}
                alt={player.champ}
                className="bubble"
                onMouseEnter={(e) => handleMouseEnter(e, `${champion}${index}`)}
                onMouseLeave={(e) => handleMouseLeave(e)}
              />
              {showTooltipBubbleKey === `${champion}${index}` && (
                <TooltipBubble
                  title={`${player.player}`}
                  content={`${formatStatsObject(player.kda)} ${formatChampName(
                    champion
                  )}`}
                />
              )}
            </span>
          );
        })}
    </div>
  );
}

export default SummonerPageOtherPlayers;
