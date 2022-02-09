import React, { useState } from "react";
import SearchInput from "./SearchInput";
import InlineDropdown from "./InlineDropdown";
import propTypes from "prop-types";
import "./PlayerSearch.css";
import crabWhite from "../assets/images/crab-white.svg";
import loading from "../assets/images/loading-icon.svg";
import regions from "../assets/json/regions.json";

function PlayerSearch({ submitCallback, isLoading }) {
  const [selectedRegion, setSelectedRegion] = useState(regions[0]);
  const [summonerName, setSummonerName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    submitCallback({ summonerName, selectedRegion });
    setSummonerName("");
  };

  return (
    <form>
      <div className="container-fluid">
        <div className="row align-items-center search-field-background">
          <div className="col">
            <SearchInput
              value={summonerName}
              setValue={(val) => setSummonerName(val)}
            />
          </div>
          <div className="col-auto white-pixels-fix g-0">
            <InlineDropdown
              dropdownOptions={regions.map((r) => r.short)}
              selectionCallback={(sel, index) => {
                setSelectedRegion(regions[index]);
              }}
            />
          </div>
          <div className="col-auto white-pixels-fix g-0 ">
            <button
              className="submit-button"
              type="submit"
              onClick={(e) => handleSubmit(e)}
            >
              <img
                src={isLoading ? loading : crabWhite}
                draggable={false}
                alt=""
              />
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

PlayerSearch.propTypes = {
  submitCallback: propTypes.func,
  isLoading: propTypes.bool,
};

export default PlayerSearch;
