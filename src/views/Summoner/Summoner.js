import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import PlayerSearchSection from "../../components/PlayerSearchSection";
import SummonerPageSummaryHeader from "./components/SummonerPageSummaryHeader";
import { ApiContext } from "../../components/providers/DataProvider";
import { useNavigate, useParams } from "react-router-dom";
import { findRegionFromName } from "../../components/helpers/findRegionFromName";
import { selectSummonerWithNameAndRegion } from "../../stores/selectors/summonerSelectors";

function Summoner() {
  const [summoner, setSummoner] = useState(null);
  const { getSummonerByName, getMatchIdsByPuuid, getMatchByMatchId } =
    useContext(ApiContext);
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // validate if URL region is legit
    const serverObject = findRegionFromName(params.server);
    if (!serverObject || !params.server || !params.name) {
      navigate(`/`, {
        replace: true,
      });
    }

    getSummonerByName(params.name, serverObject.region).then((data) => {
      if (data.error) {
        navigate(`/summonerNotFound`, { replace: true });
      } else {
        const newSummoner = data.result;

        getMatchIdsByPuuid(newSummoner.puuid, serverObject.region, 20).then(
          (data) => {
            if (data.result) {
              const matchesArray = data.result;
              setSummoner(() =>
                selectSummonerWithNameAndRegion(
                  newSummoner.name,
                  serverObject.region
                )
              );
              getMatchByMatchId(matchesArray[0], serverObject.region).then(
                (data) => {
                  console.log("Last match", data.result); //temp
                }
              );
            }
          }
        );
      }
    });
  }, [
    navigate,
    dispatch,
    params.name,
    params.server,
    getMatchIdsByPuuid,
    getMatchByMatchId,
    getSummonerByName,
  ]);

  return (
    <>
      <div className="container">
        <div className="row align-items-center justify-content-center search-container">
          <div className=" col-md-8 col-xl-5 ">
            <PlayerSearchSection />
          </div>
        </div>
        <div className="row">
          {summoner && <SummonerPageSummaryHeader summoner={summoner} />}
        </div>
      </div>
    </>
  );
}

export default Summoner;
