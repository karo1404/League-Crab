import React from "react";
import "./Footer.css";
import Text from "../Text";
import LanguageChanger from "../LanguageChanger";

function Footer() {
  return (
    <div className="container-fluid footer-container">
      <div className="row justify-content-center">
        <div className="col-lg-6 boilerplate">
          <Text textId="legalBoilerplate" />
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-6 col-lg-3 text-start g-4 padding-lg-2">
          <Text textId="contact" />:{" "}
          <a href="mailto:karol1404@vp.pl" className="email-link">
            karol1404@vp.pl
          </a>
        </div>
        <div className="col-6 col-lg-3 text-end g-4 padding-lg-2">
          <Text textId="language" />: <LanguageChanger separators={true} />
        </div>
      </div>
    </div>
  );
}

export default Footer;
