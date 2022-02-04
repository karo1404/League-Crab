import React, { useState } from "react";
import Text from "../../../components/Text";
import regions from "../../../assets/json/regions.json";
import PlayerSearch from "../../../components/PlayerSearch";

//Dictionary with error name and textId
const errorMessage = {
  nameEmpty: "searchErrorNameEmpty",
  regionEmpty: "searchErrorRegionEmpty",
};

function HomePageSearchSection() {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const handleSubmit = (formData) => {
    const formValidated = validateForm(formData);
    setIsLoading(formValidated);
  };

  const validateForm = (formData) => {
    const { summonerName, selectedRegion } = formData;
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
        regions={regions}
        submitCallback={(formData) => handleSubmit(formData)}
        isLoading={isLoading}
      />
      {errors &&
        errors.map((errorMsg) => (
          <div key={errorMsg} className="mt-3 ms-3">
            <Text textId={errorMsg} />
          </div>
        ))}
    </>
  );
}

export default HomePageSearchSection;
