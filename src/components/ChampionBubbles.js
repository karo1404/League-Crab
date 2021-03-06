import { useState } from "react";
import "./ChampionBubbles.css";
import { formatStatsObject } from "./helpers/formatStats";
import TooltipBubble from "./TooltipBubble";
import championJson from "../assets/json/champion.json";
import propTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { selectSummonerWithPuuid } from "../stores/selectors/summonerSelectors";
import { selectCurrentSummonerPuuid } from "../stores/selectors/currentSummonerSelector";

export function ChampionBubbles({ players }) {
  const navigate = useNavigate();
  const [showTooltipBubbleKey, setShowTooltipBubbleKey] = useState(false);
  const champSquareUrl =
    "https://ddragon.leagueoflegends.com/cdn/12.5.1/img/champion/";

  function handleMouseEnter(e, bubbleKey) {
    setShowTooltipBubbleKey(bubbleKey);
  }

  function handleMouseLeave(e) {
    setShowTooltipBubbleKey("");
  }

  function handleMouseClick(e, playerName) {
    const currentSummoner = selectSummonerWithPuuid(
      selectCurrentSummonerPuuid()
    );
    navigate(`/summoner/${currentSummoner.region.short}/${playerName}`);
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
              mouseClickCallback={handleMouseClick}
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
  mouseClickCallback,
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
        onClick={(e) => mouseClickCallback(e, playerName)}
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
