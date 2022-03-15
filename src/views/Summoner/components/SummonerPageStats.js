import "./SummonerPageStats.css";
import React, { useEffect, useState } from "react";
import propTypes from "prop-types";
import Text from "../../../components/Text";
import { useDispatch } from "react-redux";
import { formatStats } from "../../../components/helpers/formatStats";

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
          champions.ally.push(playerObject);
        } else {
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
              titleId={"timeSpentDead"}
              value={`${Math.floor(stats.timeDead / 60)
                .toString()
                .padStart(2, "0")}:${(Math.floor(stats.timeDead) % 60)
                .toString()
                .padStart(2, "0")}`}
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
      <p>{value ? value : ""}</p>
      <h6>{titleId ? <Text textId={titleId} /> : ""}</h6>
    </div>
  );
}

export default SummonerPageStats;
