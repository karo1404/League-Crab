import logo from "./assets/images/crab-logo-white.svg";
import "./App.css";
import { LanguageProvider } from "./components/providers/Language";
import { Outlet, NavLink } from "react-router-dom";
import React from "react";

//const API_KEY = process.env.REACT_APP_RIOT_API_KEY;

function App() {
  return (
    <LanguageProvider>
      <div className="App">
        <div className="container-fluid vh-100 p-0">
          <div className="row align-items-center ">
            <div className="col-auto ms-3 mt-3">
              <img
                src={logo}
                className="App-logo"
                style={{ width: "25rem" }}
                alt="logo"
              />
            </div>
            <div className="col-auto">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "btn btn-danger" : "btn btn-secondary"
                }
                to={"/"}
              >
                Home
              </NavLink>
            </div>
            <div className="col-auto">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "btn btn-danger" : "btn btn-secondary"
                }
                to={"/asd"}
              >
                Page not found
              </NavLink>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col text-center m-auto">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </LanguageProvider>
  );
}

export default App;
