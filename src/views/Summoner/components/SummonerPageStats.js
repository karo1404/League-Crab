import "./SummonerPageStats.css";
import React, { useEffect, useState } from "react";
import propTypes from "prop-types";
import Text from "../../../components/Text";
import { useDispatch } from "react-redux";
import { formatStats } from "../../../components/helpers/formatStats";
import getHighestOccurrence from "../../../components/helpers/getHighestOccurrence";

function SummonerPageStats({ matches, puuid }) {
  const [stats, setStats] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    let wonGames = 0;
    let surrenderedGames = 0;
    const kda = { kills: 0, deaths: 0, assists: 0 };
    let timeDead = 0;
    const champions = { ally: [], enemy: [] };
    const individualChampions = [];
    const teamGold = { playerSum: 0, teamSum: 0 };
    let stolenObjectives = 0;
    let visionWardsBought = 0;
    const playedPositions = [];

    matches.forEach((match) => {
      const currentPlayer = match.info.participants.find(
        (player) => player.puuid === puuid
      );

      //stats per match
      if (currentPlayer.win) wonGames++;
      if (currentPlayer.gameEndedInSurrender && !currentPlayer.win)
        surrenderedGames++;
      kda.kills = kda.kills + currentPlayer.kills;
      kda.deaths = kda.deaths + currentPlayer.deaths;
      kda.assists = kda.assists + currentPlayer.assists;
      individualChampions.push({ champ: currentPlayer.championName, kda });
      timeDead += currentPlayer.totalTimeSpentDead;
      teamGold.playerSum += currentPlayer.goldEarned;
      teamGold.teamSum += currentPlayer.goldEarned;
      stolenObjectives += currentPlayer.objectivesStolen;
      visionWardsBought += currentPlayer.visionWardsBoughtInGame;
      playedPositions.push(currentPlayer.teamPosition);

      //stats per player
      match.info.participants.forEach((player) => {
        if (player.puuid === currentPlayer.puuid) return;
        const playerObject = {
          player: player.summonerName,
          champ: player.championName,
          kda: {
            kills: player.kills,
            deaths: player.deaths,
            assists: player.assists,
          },
        };
        if (player.teamId === currentPlayer.teamId) {
          // allied
          champions.ally.push(playerObject);
          teamGold.teamSum += player.goldEarned;
        } else {
          // enemy
          champions.enemy.push(playerObject);
        }
      });
    });

    const statsObject = {
      winRatio: wonGames / matches.length,
      surrenderedGames,
      kills: kda.kills / matches.length,
      deaths: kda.deaths / matches.length,
      assists: kda.assists / matches.length,
      timeDead: timeDead,
      champions,
      percentageOfTeamGold: teamGold.playerSum / teamGold.teamSum,
      stolenObjectives,
      visionWardsBought,
      favoritePosition: getHighestOccurrence(playedPositions.filter(String)),
    };
    setStats(statsObject);
    dispatch({
      type: "summoners/attachStats",
      payload: { puuid, stats: statsObject },
    });
  }, [dispatch, matches, puuid]);

  return (
    <div className="stats-container mb-5">
      {stats ? (
        <div className="container-fluid">
          <div className="row m-0">
            <h6>
              <Text textId={"basedOnLast"} />
              {` ${matches.length} `}
              <Text textId={"games"} />
              {":"}
            </h6>
            <StatisticsItem
              titleId={"winRate"}
              value={`${(stats.winRatio * 100).toFixed(0)}%`}
            />
            <StatisticsItem
              titleId={"surrenderedGames"}
              value={`${stats.surrenderedGames}`}
            />
            <StatisticsItem
              titleId={"averageKda"}
              value={formatStats(
                stats.kills,
                stats.deaths,
                stats.assists,
                true
              )}
            />
            <StatisticsItem
              titleId={"percentageOfTeamGold"}
              value={`${(stats.percentageOfTeamGold * 100).toFixed(1)}%`}
            />
            <StatisticsItem
              titleId={"favoritePosition"}
              value={`${stats.favoritePosition}` || "MIDDLE"}
            />
            <StatisticsItem
              titleId={"visionWardsBought"}
              value={`${stats.visionWardsBought}`}
            />
            <StatisticsItem
              titleId={"timeSpentDead"}
              value={`${Math.floor(stats.timeDead / 60)
                .toString()
                .padStart(2, "0")}:${(Math.floor(stats.timeDead) % 60)
                .toString()
                .padStart(2, "0")}`}
            />
            <StatisticsItem
              titleId={"stolenObjectives"}
              value={`${stats.stolenObjectives}`}
            />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

SummonerPageStats.propTypes = {
  matches: propTypes.array.isRequired,
  puuid: propTypes.string.isRequired,
};

function StatisticsItem({ titleId, value }) {
  return (
    <div className="col stats-item-container mb-2">
      <p>{value}</p>
      <h6>{<Text textId={titleId} />}</h6>
    </div>
  );
}

StatisticsItem.defaultProps = {
  titleId: "",
  value: "",
};

export default SummonerPageStats;
