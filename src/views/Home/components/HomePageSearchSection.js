import React, { useState, useContext } from "react";
import Text from "../../../components/Text";

import PlayerSearch from "../../../components/PlayerSearch";
import { ApiContext } from "../../../components/providers/DataProvider";
import "./HomePageSearchSection.css";
import { useNavigate } from "react-router-dom";

//Dictionary with error name and textId
const errorMessage = {
  nameEmpty: "searchErrorNameEmpty",
  regionEmpty: "searchErrorRegionEmpty",
  nameNotFound: "searchErrorNameNotFound",
  other: "searchErrorSomethingWentWrong",
};

function HomePageSearchSection() {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const { getSummonerByName } = useContext(ApiContext);
  const navigate = useNavigate();

  const handleSubmit = (formData) => {
    if (validateForm(formData)) {
      setIsLoading(true);

      const { summonerName, selectedRegion } = formData;
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
        } else {
          navigate(`/Player/${data.result.name}`, { replace: true });
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
      <h5 className="text-center mb-4">
        <Text textId="enterSummonerName" />
      </h5>
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

export default HomePageSearchSection;
