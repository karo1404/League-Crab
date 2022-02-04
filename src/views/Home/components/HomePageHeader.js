import React from "react";
import "./HomePageHeader.css";
import headerImg from "../../../assets/images/Urgot_1.jpg";
import Text from "../../../components/Text";

function HomePageHeader() {
  return (
    <>
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
    </>
  );
}

export default HomePageHeader;
