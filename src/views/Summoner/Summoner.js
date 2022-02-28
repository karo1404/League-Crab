import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import PlayerSearchSection from "../../components/PlayerSearchSection";
import SummonerPageSummaryHeader from "./components/SummonerPageSummaryHeader";
import { ApiContext } from "../../components/providers/DataProvider";
import { useNavigate, useParams } from "react-router-dom";
import { findRegionFromName } from "../../components/helpers/findRegionFromName";

function Summoner() {
  const [summoner, setSummoner] = useState(null);
  const { getSummonerByName } = useContext(ApiContext);
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
        const { payload } = dispatch({
          type: "summoners/add",
          payload: { ...data.result, region: serverObject },
        });
        console.log(payload);
        setSummoner(payload);
      }
    });
  }, [navigate, dispatch, getSummonerByName, params.name, params.server]);

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
