import React from "react";
import "./Footer.css";
import Text from "../Text";
import LanguageChanger from "../LanguageChanger";

function Footer() {
  const authorEmail = "karol1404<at>vp.pl";

  return (
    <div className="container-fluid footer-container">
      <div className="row justify-content-center">
        <div className="col-lg-8 boilerplate">
          <Text textId="legalBoilerplate" />
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-6 col-lg-3 text-start g-4 padding-lg-2">
          <Text textId="contact" />:{" "}
          <a href={`mailto:${authorEmail}`} className="email-link">
            {authorEmail}
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
