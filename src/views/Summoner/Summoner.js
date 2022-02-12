import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PlayerSearchSection from "../../components/PlayerSearchSection";
import SummonerPageSummaryHeader from "./components/SummonerPageSummaryHeader";
import { ApiContext } from "../../components/providers/DataProvider";
import { useNavigate, useParams } from "react-router-dom";
import { findRegionFromName } from "../../components/helpers/findRegionFromName";

function Summoner() {
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const { getSummonerByName } = useContext(ApiContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const summoner = useSelector((state) => {
    state.summoners.find((sum) => sum.name === params.name);
  });

  useEffect(() => {
    const serverObject = findRegionFromName(params.server);
    if (!serverObject || !params.server || !params.name) {
      navigate(`/`, {
        replace: true,
      });
    } else if (!summoner) {
      getSummonerByName(params.name, serverObject.region).then((data) => {
        if (data.error) {
          navigate(`/`, { replace: true });
        } else {
          dispatch({
            type: "summoners/add",
            payload: { ...data.result, region: serverObject },
          });
          //TODO: fix that thingy
        }
      });
    } else {
      setIsLoading(false);
    }
  }, [
    dispatch,
    getSummonerByName,
    navigate,
    params.name,
    params.server,
    summoner,
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
          {isLoading || <SummonerPageSummaryHeader summoner={summoner} />}
        </div>
      </div>
    </>
  );
}

export default Summoner;
