import React from "react";
import "./Navbar.css";
import logo from "../../assets/images/crab-logo-white.svg";
import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar-container container">
      <div className="row align-items-center justify-content-between ">
        <div className="col-md-2"></div>
        <div className="col-2">
          <Link to="/">
            <img src={logo} className="logo" alt="logo" />
          </Link>
        </div>
        <div className="col">
          <div className="navlinks row align-items-center justify-content-end gx-md-5">
            <div className="col-auto">
              <NavLink className="navlink" to={"/"}>
                Feature 1
              </NavLink>
            </div>
            <div className="col-auto">
              <NavLink className="navlink" to={"/asd"}>
                Feature 2
              </NavLink>
            </div>
          </div>
        </div>
        <div className="col-md-2"></div>
      </div>
    </div>
  );
}

export default Navbar;
