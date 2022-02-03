import React from "react";
import "./Home.css";
import headerImg from "../../assets/images/Urgot_1.jpg";
import Text from "../../components/Text";
import regions from "../../assets/json/regions.json";
import PlayerSearch from "../../components/PlayerSearch";
import Card from "../../components/Card";

const featureShowcaseCards = [
  {
    image:
      "http://ddragon.leagueoflegends.com/cdn/img/champion/splash/Fiora_5.jpg",
    headerId: "feature1Header",
    textId: "feature1Text",
  },
  {
    image:
      "http://ddragon.leagueoflegends.com/cdn/img/champion/splash/Seraphine_4.jpg",
    headerId: "feature2Header",
    textId: "feature2Text",
  },
  {
    image:
      "http://ddragon.leagueoflegends.com/cdn/img/champion/splash/Lulu_1.jpg",
    headerId: "feature3Header",
    textId: "feature3Text",
  },
];

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
          <div className=" col-md-8 col-xl-5 ">
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

      <div className="container mt-5">
        <div className="row g-0 justify-content-center">
          <div className="col-xl-8 g-0">
            <div className="row">
              {featureShowcaseCards.map((card) => (
                <div className="col-lg-4">
                  <Card
                    image={card.image}
                    header={card.headerId}
                    text={card.textId}
                    width={20}
                    height={25}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
