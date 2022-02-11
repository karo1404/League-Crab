import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PlayerSearchSection from "../../components/PlayerSearchSection";
import SummonerPageSummaryHeader from "./components/SummonerPageSummaryHeader";
import { ApiContext } from "../../components/providers/DataProvider";
import { useSearchParams } from "react-router-dom";
import { findRegionFromName } from "../../components/helpers/findRegionFromName";

function Summoner() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const [querySummonerName, querySummonerServer] = [
    searchParams.get("name"),
    searchParams.get("server"),
  ];
  const { getSummonerByName } = useContext(ApiContext);
  const summonerObject = useSelector((state) => {
    return state.summoners.find((sum) => sum.name === querySummonerName);
  });

  useEffect(() => {
    if (!summonerObject) {
      const server = findRegionFromName(querySummonerServer);
      //TODO: logic when view is endered by link
      getSummonerByName(querySummonerName, server).then();
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <>
      <div className="container">
        <div className="row align-items-center justify-content-center search-container">
          <div className=" col-md-8 col-xl-5 ">
            <PlayerSearchSection />
          </div>
        </div>
        <div className="row">
          {isLoading || <SummonerPageSummaryHeader summoner={summonerObject} />}
        </div>
      </div>
    </>
  );
}

export default Summoner;
