import React from "react";
import "./Footer.css";
import Text from "../Text";

function Footer() {
  return (
    <div className="container-fluid footer-container">
      <div className="row justify-content-center">
        <div className="col-lg-6 boilerplate">
          <Text textId="legalBoilerplate" />
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-lg-6 text-center g-3">
          <Text textId="contact" />:{" "}
          <a href="mailto:karol1404@vp.pl" className="email-link">
            karol1404@vp.pl
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
