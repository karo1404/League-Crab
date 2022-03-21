import Text from "../../components/Text";
import React from "react";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../../components/PrimaryButton";
import bee from "../../assets/images/sad-bee.png";

function SummonerNotFound() {
  const navigate = useNavigate();
  return (
    <div className="d-flex flex-column align-items-center justify-content-center ">
      <img src={bee} alt="sad bee" className="mb-5" />
      <h1
        className="text-center info-header-text mb-3"
        style={{ color: "var(--background)" }}
      >
        <Text textId="summonerNotFound" />
      </h1>
      <PrimaryButton
        onClickCallback={function () {
          navigate(`/`, {
            replace: true,
          });
        }}
      >
        <Text textId="home" />
      </PrimaryButton>
    </div>
  );
}

export default SummonerNotFound;
