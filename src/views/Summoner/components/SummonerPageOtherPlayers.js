import "./SummonerPageOtherPlayers.css";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { formatStatsObject } from "../../../components/helpers/formatStats";
import Text from "../../../components/Text";
import TooltipBubble from "../../../components/TooltipBubble";
import championJson from "../../../assets/json/champion.json";

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

  function handleMouseEnter(e, bubbleKey) {
    setShowTooltipBubbleKey(bubbleKey);
  }

  function handleMouseLeave(e) {
    setShowTooltipBubbleKey("");
  }

  return (
    <div className="bubbles-container">
      {players &&
        players.map((player, index) => {
          const champId =
            player.champ === "FiddleSticks" ? "Fiddlesticks" : player.champ;
          const champion = championJson?.data[champId];
          return (
            <span key={`${champion?.id}${index}`}>
              <img
                src={`${champSquareUrl}${champion?.image.full}`}
                alt={player.champ}
                className="bubble"
                onMouseEnter={(e) =>
                  handleMouseEnter(e, `${champion?.id}${index}`)
                }
                onMouseLeave={(e) => handleMouseLeave(e)}
              />
              {showTooltipBubbleKey === `${champion?.id}${index}` && (
                <TooltipBubble
                  title={`${player.player}`}
                  content={`${formatStatsObject(player.kda)} ${champion?.name}`}
                />
              )}
            </span>
          );
        })}
    </div>
  );
}

export default SummonerPageOtherPlayers;
