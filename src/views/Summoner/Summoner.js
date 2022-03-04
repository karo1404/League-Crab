import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import PlayerSearchSection from "../../components/PlayerSearchSection";
import SummonerPageSummaryHeader from "./components/SummonerPageSummaryHeader";
import { ApiContext } from "../../components/providers/DataProvider";
import { useNavigate, useParams } from "react-router-dom";
import { findRegionFromName } from "../../components/helpers/findRegionFromName";
import { selectSummonerWithNameAndRegion } from "../../stores/selectors/summonerSelectors";
import SummonerPageStats from "./components/SummonerPageStats";

function Summoner() {
  const [summoner, setSummoner] = useState(null);
  const [matches, setMatches] = useState([]);
  const { getSummonerByName, getMatchIdsByPuuid, getMatchByMatchId } =
    useContext(ApiContext);
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const NUMBER_OF_MATCHES = Number.parseInt(
    process.env.REACT_APP_NUMBER_OF_MATCHES
  );

  useEffect(() => {
    setSummoner(null);
    setMatches([]);
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
        return;
      }

      const newSummoner = data.result;
      getMatchIdsByPuuid(
        newSummoner.puuid,
        serverObject.region,
        NUMBER_OF_MATCHES
      ).then((data) => {
        if (data.error) return;
        const matchesIdArray = data.result;
        setSummoner(
          selectSummonerWithNameAndRegion(newSummoner.name, serverObject.region)
        );
        for (let i = 0; i < NUMBER_OF_MATCHES; i++) {
          getMatchByMatchId(matchesIdArray[i], serverObject.region).then(
            (data) => {
              if (data.error) return;
              setMatches((prev) => [...prev, data.result]);
            }
          );
        }
      });
    });
  }, [
    navigate,
    dispatch,
    params.name,
    params.server,
    getMatchIdsByPuuid,
    getMatchByMatchId,
    getSummonerByName,
    NUMBER_OF_MATCHES,
  ]);

  function isSummonerReady() {
    if (summoner?.name !== params?.name) return false;
    if (summoner?.region.short.toLowerCase() !== params?.server.toLowerCase()) {
      return false;
    }
    return true;
  }

  function isMatchesReady() {
    if (matches?.length !== NUMBER_OF_MATCHES) return false;
    return true;
  }

  return (
    <div className="container">
      <div className="row align-items-center justify-content-center search-container">
        <div className=" col-md-8 col-xl-5 ">
          <PlayerSearchSection />
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-8 mt-4 mb-4 g-0">
          {isSummonerReady() ? (
            <SummonerPageSummaryHeader summoner={summoner} />
          ) : (
            ""
          )}
          {isSummonerReady() && isMatchesReady() ? (
            <SummonerPageStats matches={matches} puuid={summoner.puuid} />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default Summoner;
