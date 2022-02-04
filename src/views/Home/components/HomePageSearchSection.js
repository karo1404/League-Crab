import React from "react";
import Text from "../../../components/Text";
import regions from "../../../assets/json/regions.json";
import PlayerSearch from "../../../components/PlayerSearch";

function HomePageSearchSection() {
  return (
    <>
      <h5 className="text-center mb-4">
        <Text textId="enterSummonerName" />
      </h5>
      <PlayerSearch regions={regions} submitCallback={(data) => {}} />
      <div className="mt-3 ms-2">
        Here some error text if one occurs (ofc nicely formatted)
      </div>
    </>
  );
}

export default HomePageSearchSection;
