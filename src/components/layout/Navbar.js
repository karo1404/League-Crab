import React from "react";
import "./Navbar.css";
import logo from "../../assets/images/crab-logo-white.png";
import { Link } from "react-router-dom";
import LanguageChanger from "../LanguageChanger";

function Navbar() {
  return (
    <div className="navbar-container container">
      <div className="row align-items-center justify-content-between ">
        <div className="col-lg-2"></div>
        <div className="col-2">
          <Link to="/">
            <img src={logo} className="logo" alt="logo" draggable="false" />
          </Link>
        </div>
        <div className="col">
          <div className="navlinks row align-items-center justify-content-end gx-lg-5">
            <div className="col-auto">
              {/* if needed <NavLink className="navlink" to={"/"}></NavLink>*/}
            </div>
            <div className="col-auto">
              <LanguageChanger separators={true} />
            </div>
          </div>
        </div>
        <div className="col-lg-2"></div>
      </div>
    </div>
  );
}

export default Navbar;
