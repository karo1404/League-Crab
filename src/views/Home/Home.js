import React from "react";
import "./Home.css";
import headerImg from "../../assets/images/Urgot_1.jpg";
import Text from "../../components/Text";
import regions from "../../assets/json/regions.json";
import PlayerSearch from "../../components/PlayerSearch";

function Home() {
  return (
    <>
      <div className="container">
        <div className="row justify-content-center header-container">
          <div className="col-lg-8">
            <div className="header-text">
              <header className="header-line-1">
                <Text textId="headerLine1" />
                <span style={{ fontWeight: "bold" }}>
                  <Text textId="game" />
                </span>
              </header>
              <p className="header-line-2">
                <Text textId="headerLine2" />
              </p>
            </div>
            <img src={headerImg} alt="header" className="header-image" />
          </div>
        </div>

        <div className="row align-items-center justify-content-center search-container">
          <div className="col-lg-8 col-xl-4 ">
            <h5 className="text-center mb-4">
              <Text textId="enterSummonerName" />
            </h5>
            <PlayerSearch regions={regions} submitCallback={(data) => {}} />
            <div className="mt-3 ms-2">
              Here some error text if one occurs (ofc nicely formatted)
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className="col" style={{ color: "var(--primary)" }}>
            Here some illustrated cards presenting features
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
