import "./SummonerPageOtherPlayers.css";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Text from "../../../components/Text";

import { ChampionBubbles } from "../../../components/ChampionBubbles";

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
            <div className="champions-column champions-column-against">
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

export default SummonerPageOtherPlayers;
