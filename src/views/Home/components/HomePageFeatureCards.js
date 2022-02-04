import React from "react";
import Card from "../../../components/Card";

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

function HomePageFeatureCards() {
  return (
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
  );
}

export default HomePageFeatureCards;
