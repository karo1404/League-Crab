import React, { useState, useContext } from "react";
import Text from "./Text";

import PlayerSearch from "./PlayerSearch";
import { ApiContext } from "./providers/DataProvider";
import "./PlayerSearchSection.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

//Dictionary with error name and textId
const errorMessage = {
  nameEmpty: "searchErrorNameEmpty",
  regionEmpty: "searchErrorRegionEmpty",
  nameNotFound: "searchErrorNameNotFound",
  other: "searchErrorSomethingWentWrong",
};

function PlayerSearchSection() {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const { getSummonerByName } = useContext(ApiContext);
  const navigate = useNavigate();

  const handleSubmit = ({ summonerName, selectedRegion }) => {
    if (validateForm({ summonerName, selectedRegion })) {
      setIsLoading(true);

      getSummonerByName(summonerName, selectedRegion.region).then((data) => {
        if (data.error) {
          switch (data.error) {
            case 404:
              setErrors([errorMessage.nameNotFound]);
              break;
            default:
              setErrors([errorMessage.other]);
              break;
          }
          setIsLoading((prev) => false);
        } else {
          setIsLoading((prev) => false);
          navigate(
            `/summoner/${selectedRegion.short.toLowerCase()}/${
              data.result.name
            }/`
          );
        }
      });
    } else {
      setIsLoading((prev) => false);
    }
  };

  const validateForm = ({ summonerName, selectedRegion }) => {
    const detectedErrors = [];

    if (!summonerName) {
      detectedErrors.push(errorMessage.nameEmpty);
    }
    if (!selectedRegion) {
      detectedErrors.push(errorMessage.regionEmpty);
    }

    setErrors(detectedErrors);
    return detectedErrors.length === 0 ? true : false;
  };

  return (
    <>
      <PlayerSearch
        submitCallback={(formData) => handleSubmit(formData)}
        isLoading={isLoading}
      />
      {errors &&
        errors.map((errorMsg) => (
          <div key={errorMsg} className="mt-3 ms-3 error-msg">
            <Text textId={errorMsg} />
          </div>
        ))}
    </>
  );
}

export default PlayerSearchSection;
