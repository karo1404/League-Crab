import React from "react";
import "./Home.css";

import HomePageFeatureCards from "./components/HomePageFeatureCards";
import HomePageHeader from "./components/HomePageHeader";
import HomePageSearchSection from "./components/HomePageSearchSection";

function Home() {
  return (
    <>
      <div className="container">
        <div className="row justify-content-center header-container">
          <div className="col-lg-8">
            <HomePageHeader />
          </div>
        </div>
        <div className="row align-items-center justify-content-center search-container">
          <div className=" col-md-8 col-xl-5 ">
            <HomePageSearchSection />
          </div>
        </div>
      </div>
      <HomePageFeatureCards />
    </>
  );
}

export default Home;
