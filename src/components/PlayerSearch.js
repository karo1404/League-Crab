import React, { useState } from "react";
import SearchInput from "./SearchInput";
import InlineDropdown from "./InlineDropdown";
import propTypes from "prop-types";
import "./PlayerSearch.css";
import triangleArrow from "../assets/images/triangle-arrow-right.svg";

function PlayerSearch({ regions }) {
  const [selectedRegion, setSelectedRegion] = useState(regions[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form>
      <div className="container-fluid">
        <div className="row align-items-center search-field-background">
          <div className="col">
            <SearchInput />
          </div>
          <div className="col-auto g-0">
            <InlineDropdown
              dropdownOptions={regions.map((r) => r.short)}
              selectionCallback={(sel) => {
                setSelectedRegion(sel);
              }}
            />
          </div>
          <div className="col-auto g-0">
            <button
              className="submit-button"
              type="submit"
              onClick={(e) => handleSubmit(e)}
            >
              <img src={triangleArrow} draggable={false} alt="triangle arrow" />
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

PlayerSearch.propTypes = {
  regions: propTypes.array.isRequired,
};

export default PlayerSearch;
