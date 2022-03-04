import React from "react";
import "./SummonerPageSummaryHeader.css";
import propTypes from "prop-types";

function SummonerPageSummaryHeader({ summoner }) {
  const iconPath = `https://ddragon.leagueoflegends.com/cdn/12.3.1/img/profileicon/${summoner.profileIconId}.png`;

  return (
    <div className="container-fluid g-2 mb-4">
      <div className="row align-items-center justify-content-start g-0">
        <div className="col-auto">
          <img
            className="image-fluid summoner-icon"
            src={iconPath}
            draggable="false"
            alt={"summonerIcon"}
          />
        </div>
        <div className="col summoner-info">
          <h1 className="summoner-name">
            {summoner.name ? summoner.name : ""}
          </h1>
          <span className="summoner-level">
            {summoner.summonerLevel ? summoner.summonerLevel : ""}
          </span>
          <p className="summoner-region">
            {summoner.region ? summoner.region.long : ""}
          </p>
        </div>
      </div>
    </div>
  );
}

SummonerPageSummaryHeader.propTypes = {
  summoner: propTypes.object.isRequired,
};

export default SummonerPageSummaryHeader;
