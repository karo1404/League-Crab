import "./OtherPlayersInsights.css";
import propTypes from "prop-types";
import { useEffect, useState } from "react";

export default function OtherPlayersInsights({ players, areEnemyPlayers }) {
  const [insights, setInsights] = useState([]);

  useEffect(() => {
    const insights = [];

    setInsights(insights);
  }, []);

  return <></>;
}

OtherPlayersInsights.propTypes = {
  players: propTypes.array,
  areEnemyPlayers: propTypes.bool,
};

OtherPlayersInsights.defaultProps = {
  players: [],
  areEnemyPlayers: false,
};
