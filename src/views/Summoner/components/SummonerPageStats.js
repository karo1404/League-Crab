import "./SummonerPageStats.css";
import React, { useEffect, useState } from "react";
import propTypes from "prop-types";
import Text from "../../../components/Text";
import { useDispatch } from "react-redux";

function SummonerPageStats({ matches, puuid }) {
  const [stats, setStats] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    let wonGames = 0;
    let surrenderedGames = 0;
    let kda = { kills: 0, deaths: 0, assists: 0 };
    let timeDead = 0;

    matches.forEach((match) => {
      const currentPlayer = match.info.participants.find(
        (player) => player.puuid === puuid
      );
      if (currentPlayer.win) wonGames++;
      if (currentPlayer.gameEndedInSurrender && !currentPlayer.win)
        surrenderedGames++;
      kda = {
        kills: kda.kills + currentPlayer.kills,
        deaths: kda.deaths + currentPlayer.deaths,
        assists: kda.assists + currentPlayer.assists,
      };
      timeDead += currentPlayer.totalTimeSpentDead;
    });

    const statsObject = {
      winRatio: wonGames / matches.length,
      surrenderedGames,
      kills: kda.kills / matches.length,
      deaths: kda.deaths / matches.length,
      assists: kda.assists / matches.length,
      timeDead: timeDead,
    };
    setStats(statsObject);
    dispatch({
      type: "summoners/attachStats",
      payload: { puuid, stats: statsObject },
    });
  }, [dispatch, matches, puuid]);

  return (
    <div className="stats-container m-2">
      <h6>
        <Text textId={"basedOnLast"} />
        {` ${matches.length} `}
        <Text textId={"games"} />
        {":"}
      </h6>
      {stats ? (
        <div className="container-fluid">
          <div className="row g-0">
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
              value={`
              ${stats.kills.toFixed(1)}/${stats.deaths.toFixed(
                1
              )}/${stats.assists.toFixed(1)}`}
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
    <div className="col m-2 stats-item-container">
      <p>{value ? value : ""}</p>
      <h6>{titleId ? <Text textId={titleId} /> : ""}</h6>
    </div>
  );
}

export default SummonerPageStats;
