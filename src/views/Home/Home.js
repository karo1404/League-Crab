import React, { useContext } from "react";
import "./Home.css";
import headerImg from "../../assets/images/Urgot_1.jpg";
import Text from "../../components/Text";
import { LanguageContext } from "../../components/providers/Language";

function Home() {
  //temp shit
  const { usedLanguage, changeUsedLanguage } = useContext(LanguageContext);
  const changeLanguageHandler = () => {
    let languageToSet = usedLanguage === "en" ? "pl" : "en";
    changeUsedLanguage(languageToSet);
  };

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

        <div className="row align-items-center search-container">
          <div className="col text-center">search a player</div>
        </div>
      </div>

      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className="col text-center">
            <button className="btn btn-danger" onClick={changeLanguageHandler}>
              temporary EN / PL
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
