import { useState } from "react";
import "./ChampionBubbles.css";
import { formatStatsObject } from "./helpers/formatStats";
import TooltipBubble from "./TooltipBubble";
import championJson from "../assets/json/champion.json";
import propTypes from "prop-types";

export function ChampionBubbles({ players }) {
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
            <ChampionBubble
              key={`${champion?.id}${index}`}
              bubbleKey={`${champion?.id}${index}`}
              championName={champion.name}
              imgSource={`${champSquareUrl}${champion?.image.full}`}
              playerName={player.player}
              playerKda={player.kda}
              mouseEnterCallback={handleMouseEnter}
              mouseLeaveCallback={handleMouseLeave}
              isTooltipShown={
                showTooltipBubbleKey === `${champion?.id}${index}`
              }
            />
          );
        })}
    </div>
  );
}

ChampionBubbles.propTypes = {
  players: propTypes.array.isRequired,
};

export function ChampionBubble({
  bubbleKey,
  championName,
  imgSource,
  playerName,
  playerKda,
  mouseEnterCallback,
  mouseLeaveCallback,
  isTooltipShown,
}) {
  return (
    <span>
      <img
        src={imgSource}
        alt={championName}
        className="bubble"
        onMouseEnter={
          mouseEnterCallback && ((e) => mouseEnterCallback(e, bubbleKey))
        }
        onMouseLeave={mouseLeaveCallback && ((e) => mouseLeaveCallback(e))}
      />
      {isTooltipShown && (
        <TooltipBubble
          title={`${playerName}`}
          content={`${formatStatsObject(playerKda)} ${championName}`}
        />
      )}
    </span>
  );
}

ChampionBubble.defaultProps = {
  bubbleKey: "",
  championName: "-",
  imgSource: "",
  playerName: "",
  playerKda: "",
  mouseEnterCallback: undefined,
  mouseLeaveCallback: undefined,
  isTooltipShown: false,
};

ChampionBubble.propTypes = {
  bubbleKey: propTypes.string,
  championName: propTypes.string,
  imgSource: propTypes.string,
  playerName: propTypes.string,
  playerKda: propTypes.object,
  mouseEnterCallback: propTypes.func,
  mouseLeaveCallback: propTypes.func,
  isTooltipShown: propTypes.bool.isRequired,
};
